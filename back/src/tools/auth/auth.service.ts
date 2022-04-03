import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) { }

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.userService.getUserByEmail(email);
    
    if (!user) {
      return false;
    }

    return password == user.password;
  }

  async generateToken(userId: number) {
    let permission = await this.userService.getPermission(userId);
    if (permission === null) {
      return null;
    }

    const payload = { userId: userId, permission: permission };
    return this.jwtService.sign(payload);
  }
}
