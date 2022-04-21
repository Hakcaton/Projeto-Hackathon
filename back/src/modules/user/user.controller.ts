import { Controller, Get, Post, Body, HttpCode, Req, Res } from '@nestjs/common';
import { Public } from 'src/tools/auth/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './users.service';
import { Response, Request } from 'express';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService
  ) {}

  @Public()
  @Post('create')
  async addUser(@Body() user:CreateUserDto, @Res() res: Response) {
    await this.userService.addUser(user, res);
    res.send();
  }

  @HttpCode(200)
  @Get('profile')
  async userProfile(@Req() req: Request, @Res() res: Response): Promise<User> {
    const user = await this.userService.userProfile(req.headers.authorization, res);
    res.send(user);
    return user;
  }
}