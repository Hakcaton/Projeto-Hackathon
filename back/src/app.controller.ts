import { Controller, Get, Request, Post, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './tools/auth/auth.service';
import { UserService } from './services/user.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService, private userService: UserService) { }

}
