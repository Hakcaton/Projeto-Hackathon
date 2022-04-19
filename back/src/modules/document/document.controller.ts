import { Controller, Get, Param } from '@nestjs/common';
import { DocumentService } from './document.service';
import { PendingEmployeeDocumentDto } from './dto/pending-employee-document.dto';
import { Document } from './entities/document.entities';

@Controller('documents')
export class DocumentController {
  constructor(private documentService: DocumentService) { }

  @Get('pending/:contractId')
  async getPendingDocuments(@Param() params: any): Promise<Document[]> {
    // FALTA VERIFICAR SE O USUÁRIO QUE FEZ A REQUISIÇÃO É FUNCIONÁRIO DA ESTIVA (permission = 1) OU RESPONSÁVEL PELO CONTRATO.

    await this.documentService.generatePendingDocuments(params.contractId);
    return await this.documentService.getPendingDocuments(params.contractId);
  }

  @Get('employees/pending/:contractId')
  async getEmployeesPendingDocuments(@Param() params: any): Promise<PendingEmployeeDocumentDto[]> {
    // FALTA VERIFICAR SE O USUÁRIO QUE FEZ A REQUISIÇÃO É FUNCIONÁRIO DA ESTIVA (permission = 1) OU RESPONSÁVEL PELO CONTRATO.

    await this.documentService.generateEmployeesPendingDocuments(params.contractId);
    return this.documentService.getEmployeesPendingDocuments(params.contractId);
  }

}
