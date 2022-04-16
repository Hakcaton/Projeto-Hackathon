import { Controller, Get, Post, Body, HttpCode, Req, HttpException, HttpStatus } from '@nestjs/common';
import { Public } from 'src/tools/auth/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './users.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService
  ) {}

  @Public()
  @Post('create')
  async addUser(@Body() user:CreateUserDto): Promise<User> {
    const result = await this.userService.addUser(user);
    if(!result) throw new HttpException('User Already Exists!', HttpStatus.CONFLICT);
    return result;
  }

  @HttpCode(200)
  @Get('profile')
  async userProfile(@Req() bearer: string): Promise<User> {
    return
  }

}