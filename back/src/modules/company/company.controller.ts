import { Controller, Get, HttpStatus, Param, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from 'src/tools/auth/auth.service';
import { CompanyService } from './company.service';

@Controller('companies')
export class CompanyController {
    constructor(private companyService: CompanyService, private authService: AuthService) { }

    @Get()
    async getCompanies(@Req() req: Request, @Res() res: Response): Promise<void> {
        if (req.user['permission'] == 1) {
            res.status(HttpStatus.UNAUTHORIZED).send();
            return;
        }

        res.send(await this.companyService.getCompanies(res));
    }

    @Get(':companyCNPJ/contracts')
    async getContracts(@Req() req: Request, @Res() res: Response, @Param() params: any): Promise<void> {
        const userId: string = req.user['userId'];
        const companyCNPJ: string = params.companyCNPJ;

        if (await this.authService.verifyResponsablePermission(userId, null, companyCNPJ) == false) {
            res.status(HttpStatus.UNAUTHORIZED).send();
            return;
        }

        res.send(await this.companyService.getContracts(companyCNPJ, res));
    }
}
