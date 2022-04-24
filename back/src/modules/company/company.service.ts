import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { GetContractDto } from '../contract/dto/get-contract.dto';
import { Contract } from '../contract/entities/contract.entity';
import { GetCompanyDto } from './dto/get-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company) private companyRepository: Repository<Company>,
        @InjectRepository(Contract) private contractRepository: Repository<Contract>
    ) { }

    async getCompanies(res: Response): Promise<GetCompanyDto[]> {
        try {
            const rawCompanies: Company[] = await this.companyRepository.find();

            let companies: GetCompanyDto[] = rawCompanies.map((company: any) => {
                delete company.responsableUserId;
                return company;
            });

            return companies;
        }
        catch (err) {
            if (!res) {
                throw err;
            }
            res.status(HttpStatus.BAD_REQUEST);
        }
    }

    async getContracts(companyCNPJ: string, res: Response): Promise<GetContractDto[]> {
        try {
            const rawContracts: Contract[] = await this.contractRepository.find({ companyCNPJ });

            let contracts: GetContractDto[] = rawContracts.map((contract: any) => {
                delete contract.companyCNPJ;
                return contract;
            });

            return contracts;
        }
        catch (err) {
            if (!res) {
                throw err;
            }
            res.status(HttpStatus.BAD_REQUEST);
        }
    }
}
