import { Controller, Get, Param, Req } from '@nestjs/common';
import { Public } from 'src/tools/auth/constants';
import { DocumentService } from './document.service';
import { Document } from './entities/document.entities';

@Controller('documents')
export class DocumentController {
  constructor(private documentService: DocumentService) { }

  @Public()
  @Get('pending/:contractId')
  async getPendingDocuments(@Param() params: any): Promise<Document[]> {

    // FALTA VERIFICAR SE O USUÁRIO QUE FEZ A REQUISIÇÃO É FUNCIONÁRIO DA ESTIVA (permission = 1) OU RESPONSÁVEL PELO CONTRATO.

    await this.documentService.generatePendingDocuments(params.contractId);
    return await this.documentService.getPendingDocuments(params.contract_id);

  }

}
