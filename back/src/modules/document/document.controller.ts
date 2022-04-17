import { Controller, Get, Param, Req } from '@nestjs/common';
import { Public } from 'src/tools/auth/constants';
import { DocumentService } from './document.service';

@Controller('documents')
export class DocumentController {
    constructor(private documentService: DocumentService) {}

    @Public()
    @Get('pending/:id')
    async getPendingDocuments(@Param() contractId: string): Promise<void> {
        return await this.documentService.getPendingDocuments(contractId)
      //verificar se o usuario é o responsavel pelo contrato ou se o usuario é funcionario da estiva(Interno).

    }    

}
