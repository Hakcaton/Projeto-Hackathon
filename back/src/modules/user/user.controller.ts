import { Controller, Get, Post, Body, HttpCode, Req, Res, Patch } from '@nestjs/common';
import { Public } from 'src/tools/auth/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './users.service';
import { Response, Request } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';

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

  @Patch('profile')
  async updateProfile(@Body() user: UpdateUserDto, @Req() req: Request, @Res() res: Response): Promise<void>{
    user.id = req.user['userId'];
    await this.userService.updateProfile(user, res);
    res.send();
  }
}