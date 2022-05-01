import { HttpStatus, Injectable } from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FormField } from '../form-field/entities/form-field.entity';
import { Document } from './entities/document.entities';
import { Employee } from '../employee/entities/employee.entity';
import { DocumentDto } from './dto/pending-document.dto';
import { FileDto } from './dto/file.dto';
import { Response } from 'express';
import { eError } from 'src/tools/enum/error.definition';
import { DateToString } from 'src/tools/helpers/date.helper';
import { eDocumentStatus } from 'src/tools/enum/document-status.definition';
import { ValidateDocumentDto } from './dto/validate-document.dto';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document) private documentRepository: Repository<Document>,
    @InjectRepository(FormField) private formFieldRepository: Repository<FormField>,
    @InjectRepository(Employee) private employeeRepository: Repository<Employee>

  ) { }

  async updateDocumentFile(documentId: string, file: FileDto, res?: Response) {
    try {
      if (file.base64 == null || file.format == null) {
        throw eError.NOT_ENOUGTH_PARAMETERS;
      }

      if (file.base64 == "" || file.format == "") {
        throw eError.INVALID_PARAMETERS;
      }

      const document = await this.documentRepository.findOne({ id: documentId });

      if (document == null) {
        throw eError.RESOURCE_NOT_FOUND;
      }

      document.file_format = file.format;
      document.file_stream = Buffer.from(file.base64.split(',')[1], 'base64');
      document.status = 1;

      await this.documentRepository.save(document);
    }
    catch (err) {
      if (!res) {
        throw err;
      }
      switch (err) {
        case eError.RESOURCE_NOT_FOUND: {
          res.status(HttpStatus.NOT_FOUND);
          break;
        }

        default:
          res.status(HttpStatus.BAD_REQUEST);
          break;
      }
    }
  }

  async deleteDocumentFile(documentId: string, res?: Response) {
    try {
      const document = await this.documentRepository.findOne({ id: documentId });

      if (document == null) {
        throw eError.RESOURCE_NOT_FOUND;
      }

      document.file_format = null;
      document.file_stream = null;
      document.status = 0;

      await this.documentRepository.save(document);
    }
    catch (err) {
      if (!res) {
        throw err;
      }
      switch (err) {
        case eError.RESOURCE_NOT_FOUND: {
          res.status(HttpStatus.NOT_FOUND);
          break;
        }

        default:
          res.status(HttpStatus.BAD_REQUEST);
          break;
      }
    }
  }

  async getDocument(documentId: string, res: Response): Promise<DocumentDto> {
    try {
      const rawDoc: Document = await this.documentRepository.findOne({ id: documentId });
      const formField: FormField = await this.formFieldRepository.findOne({ id: rawDoc.form_field_id });

      if (rawDoc == null || formField == null) {
        throw eError.RESOURCE_NOT_FOUND;
      }

      let newDoc: DocumentDto = new DocumentDto();

      newDoc.id = rawDoc.id;
      newDoc.title = formField.title;
      newDoc.subtitle = formField.subtitle;
      newDoc.subtitle = newDoc.subtitle.replace('<request-date>', DateToString(rawDoc.request_date));
      newDoc.status = rawDoc.status;
      newDoc.tooltipText = rawDoc.comment;
      newDoc.requestDate = rawDoc.request_date;

      if (rawDoc.file_format != null && rawDoc.file_stream != null) {
        const fileFormat: string = rawDoc.file_format.split('.')[rawDoc.file_format.split('.').length - 1];
        newDoc.file.base64 = 'data:application/' + fileFormat + ';base64,' + Buffer.from(rawDoc.file_stream).toString('base64');
        newDoc.file.format = rawDoc.file_format;
      }
      return newDoc;
    }
    catch (err) {
      if (!res) {
        throw err;
      }
      switch (err) {
        case eError.RESOURCE_NOT_FOUND: {
          res.status(HttpStatus.NOT_FOUND);
          break;
        }

        default: {
          res.status(HttpStatus.BAD_REQUEST);
          break;
        }
      }
    }
  }

  async validateDocument(documnetId: string, validate: ValidateDocumentDto, res: Response) {
    try {
      let registeredDocument = await this.documentRepository.findOne({ id: documnetId });

      if (registeredDocument == null) {
        throw eError.RESOURCE_NOT_FOUND;
      }

      registeredDocument.status = validate.approved ? eDocumentStatus.approved : eDocumentStatus.invalid;

      registeredDocument.comment = validate.approved ? '' : validate.reason;

      await this.documentRepository.save(registeredDocument);
    }
    catch (err) {
      if (!res) {
        throw err;
      }
      switch (err) {
        case eError.RESOURCE_NOT_FOUND: {
          res.status(HttpStatus.NOT_FOUND);
          break;
        }

        default: {
          res.status(HttpStatus.BAD_REQUEST);
          break;
        }
      }
    }
  }
}
