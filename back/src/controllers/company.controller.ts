import {
  Controller,
  Post,
  UseGuards,
  Request,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { InternalInsertCompanyDBModel } from 'src/models/internal-insert-company-db.model';
import { CompanyService } from 'src/services/company.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/tools/auth/jwt-auth.guard';

@Controller('api/company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @UseGuards(JwtAuthGuard)
  @Post('register/company')
  async insertCompany(@Request() req, @Res() res: Response) {
    let result = await this.companyService.insertNewCompany(req.body);

    res.status(HttpStatus.CREATED).send({ response: result });
  }
}
