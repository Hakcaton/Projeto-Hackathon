import { HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { randomBytes } from "crypto";
import { Response } from "express";
import { Company } from "src/modules/company/entities/company.entity";
import { Contract } from "src/modules/contract/entities/contract.entity";
import { User } from "src/modules/user/entities/user.entity";
import { UserService } from "src/modules/user/users.service";
import { Repository } from "typeorm";
import { Cryptography } from "../cryptography/cryptography.class";
import { Emails } from "../emails/emails.service";
import { eError } from "../enum/error.definition";
import { ePermission } from "../enum/permission.definition";
import { IForgotPassoword, ILogin } from "./auth.interface";
import { Auth } from "./entities/auth.entity";

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User) private userRepository: Repository<User>,
		@InjectRepository(Contract) private contractRepository: Repository<Contract>,
		@InjectRepository(Company) private companyRepository: Repository<Company>,
		@InjectRepository(Auth) private authRepository: Repository<Auth>,
		private usersService: UserService,
		private jwtService: JwtService,
		private emails: Emails
	) {}

	async validateUser(email: string, pass: string): Promise<any> {
		const user = await this.usersService.findOne(email);
		if (user) {
			const match = await Cryptography.compare(pass, user.password);
			if (match) {
				return {
					userId: user.id,
					permission: user.permission,
				};
			}
		}
		return null;
	}

	async login(user: ILogin): Promise<Object> {
		try {
			const userLogin = await this.validateUser(user.email, user.password);
			if (!userLogin) throw new Error("User or password Invalid!");
			return { access_token: await this.generateToken(userLogin.userId) };
		} catch (err) {}
	}

	async forgotPassoword(email: string, res?: Response) {
		try {
			const userExists = await this.userRepository.findOne({ email });
			if (!userExists) throw eError.RESOURCE_NOT_FOUND;

			const token = randomBytes(16).toString("hex");

			const dbToken = this.authRepository.create({ user_id: userExists.id, token });
			await this.authRepository.save(dbToken);

			await this.emails.sendEmail(email, token);
		} catch (err) {
			if (!res) throw err;
			switch (err) {
				case eError.RESOURCE_NOT_FOUND:
					res.status(HttpStatus.NOT_FOUND);
					break;

				default:
					res.status(HttpStatus.BAD_REQUEST);
					break;
			}
		}
	}

	async resetPassword(data: IForgotPassoword) {}

	public async generateToken(userId: string): Promise<string> {
		const user = await this.userRepository.findOne({ id: userId });

		return this.jwtService.sign({ userId: user.id, permission: user.permission });
	}

	async verifyResponsablePermission(
		userId: string,
		contractId?: string,
		companyCNPJ?: string
	): Promise<boolean> {
		const user: User = await this.userRepository.findOne({ id: userId });

		if (user.permission == ePermission.internalEmployee) {
			return true;
		}

		if (contractId) {
			const contract: Contract = await this.contractRepository.findOne({ id: contractId });
			const company: Company = await this.companyRepository.findOne({ cnpj: contract.companyCNPJ });
			return company.responsableUserId == user.id;
		} else if (companyCNPJ) {
			const company: Company = await this.companyRepository.findOne({ cnpj: companyCNPJ });
			return company.responsableUserId == user.id;
		}

		return false;
	}
}
