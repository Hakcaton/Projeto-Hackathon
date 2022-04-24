import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CompanyService } from './company.service';

@Controller('companies')
export class CompanyController {
    constructor(private companyService: CompanyService) { }

    @Get()
    async getCompanies(@Req() req: Request, @Res() res: Response): Promise<void> {
        if(req.user['permission'] == 1){
            res.status(HttpStatus.UNAUTHORIZED).send();
            return;
        }

        res.send(await this.companyService.getCompanies(res));
    }
}
