import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { DocumentDto } from '../document/dto/pending-document.dto';
import { PendingEmployeeDocumentDto } from '../document/dto/pending-employee-document.dto';
import { ContractService } from './contract.service';
import { AddEmployeeDto } from './dto/add-employee.dto';

@Controller('contracts')
export class ContractController {
  constructor(private contractService: ContractService) { }

  @Get(':contractId/documents/pending')
  async getPendingDocuments(@Param() params: any): Promise<DocumentDto[]> {
    // FALTA VERIFICAR SE O USUÁRIO QUE FEZ A REQUISIÇÃO É FUNCIONÁRIO DA ESTIVA (permission = 1) OU RESPONSÁVEL PELO CONTRATO.

    await this.contractService.generatePendingDocuments(params.contractId);
    return await this.contractService.getPendingDocuments(params.contractId);
  }

  @Get(':contractId/employees/documents/pending')
  async getEmployeesPendingDocuments(@Param() params: any): Promise<PendingEmployeeDocumentDto[]> {
    // FALTA VERIFICAR SE O USUÁRIO QUE FEZ A REQUISIÇÃO É FUNCIONÁRIO DA ESTIVA (permission = 1) OU RESPONSÁVEL PELO CONTRATO.

    await this.contractService.generateEmployeesPendingDocuments(params.contractId);
    return this.contractService.getEmployeesPendingDocuments(params.contractId);
  }

  @Post(':contractId/employees')
  async addEmployee(@Body() employee: AddEmployeeDto, @Res() res: Response, @Param() params: any) {
    // FALTA VERIFICAR SE O USUÁRIO QUE FEZ A REQUISIÇÃO É FUNCIONÁRIO DA ESTIVA (permission = 1) OU RESPONSÁVEL PELO CONTRATO.

    employee.contractId = params.contractId;
    res.send(await this.contractService.addEmployee(employee, res));
  }
}
