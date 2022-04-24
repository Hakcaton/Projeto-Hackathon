import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { ContractService } from './contract.service';
import { AddEmployeeDto } from './dto/add-employee.dto';
import { AuthService } from 'src/tools/auth/auth.service';

@Controller('contracts')
export class ContractController {
  constructor(private contractService: ContractService, private authService: AuthService) { }

  @Get(':contractId/documents/pending')
  async getPendingDocuments(@Param() params: any, @Req() req: Request, @Res() res: Response): Promise<void> {
    const userId: string = req.user['userId'];
    const contractId: string = params.contractId;

    if (await this.authService.verifyResponsablePermission(userId, contractId) == false){
      res.status(HttpStatus.UNAUTHORIZED).send();
      return;
    }

    await this.contractService.generatePendingDocuments(params.contractId);
    res.send(await this.contractService.getPendingDocuments(params.contractId));
  }

  @Get(':contractId/documents/sent')
  async getSentDocuments(@Param() params: any, @Req() req: Request, @Res() res: Response): Promise<void> {
    const userId: string = req.user['userId'];
    const contractId: string = params.contractId;

    if (await this.authService.verifyResponsablePermission(userId, contractId) == false){
      res.status(HttpStatus.UNAUTHORIZED).send();
      return;
    }

    res.send(await this.contractService.getSentDocuments(params.contractId));
  }

  @Get(':contractId/employees/documents/pending')
  async getEmployeesPendingDocuments(@Param() params: any, @Req() req: Request, @Res() res: Response): Promise<void> {
    const userId: string = req.user['userId'];
    const contractId: string = params.contractId;

    if (await this.authService.verifyResponsablePermission(userId, contractId) == false){
      res.status(HttpStatus.UNAUTHORIZED).send();
      return;
    }

    await this.contractService.generateEmployeesPendingDocuments(params.contractId);
    res.send(await this.contractService.getEmployeesPendingDocuments(params.contractId));
  }

  @Get(':contractId/employees/documents/sent')
  async getEmployeesSentDocuments(@Param() params: any, @Req() req: Request, @Res() res: Response): Promise<void> {
    const userId: string = req.user['userId'];
    const contractId: string = params.contractId;

    if (await this.authService.verifyResponsablePermission(userId, contractId) == false){
      res.status(HttpStatus.UNAUTHORIZED).send();
      return;
    }

    res.send(this.contractService.getEmployeesSentDocuments(params.contractId));
  }

  @Post(':contractId/employees')
  async addEmployee(@Body() employee: AddEmployeeDto, @Res() res: Response, @Param() params: any, @Req() req: Request): Promise<void> {
    const userId: string = req.user['userId'];
    const contractId: string = params.contractId;

    if (await this.authService.verifyResponsablePermission(userId, contractId) == false){
      res.status(HttpStatus.UNAUTHORIZED).send();
      return;
    }

    employee.contractId = params.contractId;
    res.send(await this.contractService.addEmployee(employee, res));
  }
}
