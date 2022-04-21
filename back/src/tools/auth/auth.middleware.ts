import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from 'src/tools/auth/constants';
import { AuthService } from './auth.service';

@Injectable()
export class TokenRefresherMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization.replace('Bearer ', '');
    try {
      let validated: any = jwt.verify(token, jwtConstants.secret);
      let newToken = await this.authService.generateToken(validated.userId);
      res.set({ 'authorization': newToken });
    }
    catch {
      delete req.headers.authorization;
    }
    next();
  }
}
