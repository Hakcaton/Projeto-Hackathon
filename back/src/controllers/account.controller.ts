import { Controller, Request, Get, UseGuards } from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { JwtAuthGuard } from 'src/tools/auth/jwt-auth.guard';

@Controller('account')
export class AccountController {
    constructor(private userService: UserService){}

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        let user = await this.userService.getUserById(req.user.userId);
        
        delete user.password;

        return user;
    }
}
