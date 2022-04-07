import { Controller, Request, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { AuthService } from 'src/tools/auth/auth.service';

@Controller('api/authentication')
export class AuthenticationController {
    constructor(private authService: AuthService, private userService: UserService){}

    @Post('login')
    async Login(@Request() req) {
        if(! await this.authService.validateUser(req.body.email, req.body.password)){
            throw new HttpException('E-Mail ou senha inválido', HttpStatus.UNAUTHORIZED); 
          }
          
          let userId = await this.userService.getIdByEmail(req.body.email);
          return this.authService.generateToken(userId);
    }
}
