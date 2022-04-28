import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from 'src/tools/auth/auth.service';
import { Public } from 'src/tools/auth/constants';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/users.service';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Controller('companies')
export class CompanyController {
  constructor(
    private companyService: CompanyService,
    private authService: AuthService,
    private userService: UserService,
  ) { }

  @Get()
  async getCompanies(@Req() req: Request, @Res() res: Response): Promise<void> {
    if (req.user['permission'] == 1) {
      res.status(HttpStatus.UNAUTHORIZED).send();
      return;
    }

    res.send(await this.companyService.getCompanies(res));
  }

  @Get('contracts')
  async getOutsourcedContracts(@Req() req: Request, @Res() res: Response): Promise<void> {
    const userId: string = req.user['userId'];
    const companyCNPJ: string = (await this.companyService.getCompanyByResponsableUser(userId, res)).cnpj;

    if (!companyCNPJ) {
      res.status(HttpStatus.NOT_FOUND).send();
      return;
    }

    res.send(await this.companyService.getContracts(companyCNPJ, res));
  }

  @Get(':companyCNPJ')
  async getCompany(@Req() req: Request, @Res() res: Response, @Param() params: any): Promise<void> {
    const userId: string = req.user['userId'];
    const companyCNPJ: string = params.companyCNPJ;

    if (await this.authService.verifyResponsablePermission(userId, null, companyCNPJ) == false) {
      res.status(HttpStatus.UNAUTHORIZED).send();
      return;
    }

    res.send(await this.companyService.getCompany(companyCNPJ, res));
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

  @Post()
  async addCompany(@Req() req: Request, @Res() res: Response, @Body() company: CreateCompanyDto): Promise<void> {
    if (req.user['permission'] == 1) {
      res.status(HttpStatus.UNAUTHORIZED).send();
      return;
    }

    const userCreate = <CreateUserDto>{
      email: company.userData.email,
      lastName: company.userData.lastName,
      name: company.userData.name,
      permission: 1,
      password: 'a'
    };

    await this.userService.addUser(userCreate, res);
    const user: User = await this.userService.findOne(company.userData.email);

    if (!user) {
      res.send();
      return;
    }

    await this.companyService.addCompany(company, user.id, res);

    res.send();
  }
}
