import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FormField } from '../form-field/entities/form-field.entity';
import { Document } from './entities/document.entities';

@Injectable()
export class DocumentService {

    constructor(
        @InjectRepository(Document) private documentRepository: Repository<Document>,
        @InjectRepository(FormField) private formFieldRepository: Repository<FormField>,

      ) {}

    async getPendingDocuments(contractId: any): Promise<void> {
      const formFields = await this.formFieldRepository.find({ contract: contractId });
      const employeesDocuments = await this.documentRepository.find({})
      console.log(formFields)
    }
}
