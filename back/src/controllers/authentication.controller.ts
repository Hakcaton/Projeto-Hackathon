import {
  Controller,
  Request,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from 'src/services/user.service';
import { AuthService } from 'src/tools/auth/auth.service';

@Controller('api/authentication')
export class AuthenticationController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  async Login(@Request() req, @Res() res: Response) {
    if (
      !(await this.authService.validateUser(req.body.email, req.body.password))
    ) {
      throw new HttpException(
        'E-Mail ou senha inválido',
        HttpStatus.UNAUTHORIZED,
      );
    }

    let userId = await this.userService.getIdByEmail(req.body.email);
    res.status(HttpStatus.ACCEPTED).send({
      authToken: await this.authService.generateToken(userId),
      email: req.body.email,
    });
  }
}
