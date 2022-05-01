import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Put, Req, Res } from '@nestjs/common';
import { DocumentService } from './document.service';
import { FileDto } from './dto/file.dto';
import { Request, Response } from 'express';
import { ValidateDocumentDto } from './dto/validate-document.dto';
import { ePermission } from 'src/tools/enum/permission.definition';

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

  @Patch(':documentId')
  async validateDocument(@Param() params: any, @Req() req: Request, @Res() res: Response, @Body() validate: ValidateDocumentDto): Promise<void> {
    const userPermission: ePermission = req.user['permission'];

    if (userPermission != ePermission.internalEmployee) {
      res.status(HttpStatus.UNAUTHORIZED).send();
      return;
    }

    const documentId: string = params['documentId'];
    await this.documentService.validateDocument(documentId, validate, res);
    res.send();
  }
}
