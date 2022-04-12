import { Controller, Request, Get, UseGuards, Post } from '@nestjs/common';
import { InternalProfileGetModel } from 'src/models/internal-profile-get.model';
import { AccountService } from 'src/services/account.service';
import { JwtAuthGuard } from 'src/tools/auth/jwt-auth.guard';

@Controller('api/account')
export class AccountController {
    constructor(private accountService: AccountService){}

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        let profile = await this.accountService.getProfileById(req.user.userId);

        profile = profile as InternalProfileGetModel;

        return profile;
    }

    @UseGuards(JwtAuthGuard)
    @Post('profile')
    async updateProfile(@Request() req) {
        let user = await this.accountService.getProfileById(req.user.userId);
        
        delete user.password;

        return user;
    }
}
