
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/users.service';
import { Cryptography } from '../cryptography/cryptography.class';
import { IForgotPassoword, ILogin } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
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
      return {access_token: this.jwtService.sign(userLogin)};
    } catch(err) { }
  }

  async forgotPassoword(email: string) {}

  async resetPassword(data: IForgotPassoword) {}
}