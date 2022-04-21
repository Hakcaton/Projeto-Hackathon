
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/users.service';
import { Repository } from 'typeorm';
import { Cryptography } from '../cryptography/cryptography.class';
import { IForgotPassoword, ILogin } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user) {
      const match = await Cryptography.compare(pass, user.password);
      if(match) {
        return {
          userId: user.id,
          permission: user.permission
        };
      }
    }
    return null;
  }

  async login(user: ILogin): Promise<Object> {
    try{
      const userLogin = await this.validateUser(user.email, user.password);
      if(!userLogin) throw new Error ("User or password Invalid!");
      return {access_token: await this.generateToken(userLogin.userId)};
    } catch(err) { }
  }

  async forgotPassoword(email: string) {}

  async resetPassword(data: IForgotPassoword) {}

  public async generateToken(userId: string): Promise<string> {
    const user = await this.userRepository.findOne({id: userId});

    return this.jwtService.sign({userId: user.id, permission: user.permission});
  }
}