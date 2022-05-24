import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ePermission } from 'src/tools/enum/permission.definition';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
    constructor(private dashBoardService: DashboardService) { }

    @Get()
    async getDashboardData(@Req() req: Request, @Res() res: Response): Promise<void> {
        const userPermission: ePermission = req.user['permission'];

        if (userPermission != ePermission.internalEmployee) {
            res.status(HttpStatus.UNAUTHORIZED).send();
            return;
        }

        res.send(await this.dashBoardService.getDashBoardData());
    }

}
