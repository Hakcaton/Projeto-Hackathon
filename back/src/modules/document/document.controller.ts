import { Body, Controller, Delete, Get, Param, Patch, Put, Res } from '@nestjs/common';
import { DocumentService } from './document.service';
import { FileDto } from './dto/file.dto';
import { Response } from 'express';

@Controller('documents')
export class DocumentController {
  constructor(private documentService: DocumentService) { }

  @Put(':documentId/file')
  async updateDocumentFile(@Body() file: FileDto, @Param() params: any, @Res() res: Response) {
    await this.documentService.updateDocumentFile(params.documentId, file, res);
    res.send();
  }

  @Delete(':documentId/file')
  async deleteDocumentFile(@Param() params: any, @Res() res: Response) {
    await this.documentService.deleteDocumentFile(params.documentId, res);
    res.send();
  }

  @Get(':documentId')
  async getDocument(@Param() params: any, @Res() res: Response) {
    res.send(await this.documentService.getDocument(params.documentId, res));
  }
}
