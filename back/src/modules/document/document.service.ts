import { Injectable } from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FormField } from '../form-field/entities/form-field.entity';
import { Document } from './entities/document.entities';
import { SELECT_LATEST_DOCUMENTS_FROM_CONTRACT, SELECT_PENDING_DOCUMENTS_FROM_CONTRACT, SELECT_PENDING_FORM_FIELDS_FROM_CONTRACT } from 'src/queries/pending-documents.queries';
import { eRecurrence } from '../form-field/dto/enum.eRecurrence';

@Injectable()
export class DocumentService {

  removeHours(date: Date): Date {
    return new Date(date.setHours(0, 0, 0, 0));
  }

  addDays(date: Date, days: number = 1): Date {
    return new Date(date.setDate(date.getDate() + days));
  }
  addWeeks(date: Date, weeks: number = 1): Date {
    return new Date(date.setDate(date.getDate() + weeks * 7));
  }
  addMonths(date: Date, months: number = 1): Date {
    return new Date(date.setMonth(date.getMonth() + months));
  }
  addYears(date: Date, years: number = 1): Date {
    return new Date(date.setFullYear(date.getFullYear() + years));
  }

  constructor(
    @InjectRepository(Document) private documentRepository: Repository<Document>,
    @InjectRepository(FormField) private formFieldRepository: Repository<FormField>,

  ) { }

  async generatePendingDocuments(contractId: string): Promise<void> {
    const pendingFormFields: FormField[] = await this.formFieldRepository.query(SELECT_PENDING_FORM_FIELDS_FROM_CONTRACT, [contractId]);
    const latestRequestedDocuments: Document[] = await this.documentRepository.query(SELECT_LATEST_DOCUMENTS_FROM_CONTRACT, [contractId]);

    const today = this.removeHours(new Date());

    let newDocuments: any = [];

    pendingFormFields.map(pendingFormField => {
      const latestDocument: Document = latestRequestedDocuments.find(doc => doc.form_field_id == pendingFormField.id);

      if (latestDocument) {
        if (pendingFormField.recurrence == eRecurrence.annually) {
          let nextRequestDate: Date = this.addYears(latestDocument.request_date);
          while (nextRequestDate <= today) {
            let newDocument: any = {
              status: 0,
              request_date: new Date(nextRequestDate),
              form_field_id: pendingFormField.id
            }

            newDocuments.push(newDocument);
            nextRequestDate = this.addYears(nextRequestDate);
          }
        }
        else if (pendingFormField.recurrence == eRecurrence.monthly) {
          let nextRequestDate: Date = this.addMonths(latestDocument.request_date);
          while (nextRequestDate <= today) {
            let newDocument: any = {
              status: 0,
              request_date: new Date(nextRequestDate),
              form_field_id: pendingFormField.id
            }

            newDocuments.push(newDocument);
            nextRequestDate = this.addMonths(nextRequestDate);
          }
        }
        else if (pendingFormField.recurrence == eRecurrence.weekly) {
          let nextRequestDate: Date = this.addWeeks(latestDocument.request_date);
          while (nextRequestDate <= today) {
            let newDocument: any = {
              status: 0,
              request_date: new Date(nextRequestDate),
              form_field_id: pendingFormField.id
            }

            newDocuments.push(newDocument);
            nextRequestDate = this.addWeeks(nextRequestDate);
          }
        }
        else if (pendingFormField.recurrence == eRecurrence.daily) {
          let nextRequestDate: Date = this.addDays(latestDocument.request_date);
          while (nextRequestDate <= today) {
            let newDocument: any = {
              status: 0,
              request_date: new Date(nextRequestDate),
              form_field_id: pendingFormField.id
            }

            newDocuments.push(newDocument);
            nextRequestDate = this.addDays(nextRequestDate);
          }
        }
      }
      else {
        if (pendingFormField.recurrence == eRecurrence.once) {
          let nextRequestDate: Date = new Date(pendingFormField.first_request_date);
          let newDocument: any = {
            status: 0,
            request_date: new Date(nextRequestDate),
            form_field_id: pendingFormField.id
          }

          newDocuments.push(newDocument);
          nextRequestDate = this.addYears(nextRequestDate);
        }
        else if (pendingFormField.recurrence == eRecurrence.annually) {
          let nextRequestDate: Date = new Date(pendingFormField.first_request_date);
          while (nextRequestDate <= today) {
            let newDocument: any = {
              status: 0,
              request_date: new Date(nextRequestDate),
              form_field_id: pendingFormField.id
            }

            newDocuments.push(newDocument);
            nextRequestDate = this.addYears(nextRequestDate);
          }
        }
        else if (pendingFormField.recurrence == eRecurrence.monthly) {
          let nextRequestDate: Date = new Date(pendingFormField.first_request_date);
          while (nextRequestDate <= today) {
            let newDocument: any = {
              status: 0,
              request_date: new Date(nextRequestDate),
              form_field_id: pendingFormField.id
            }

            newDocuments.push(newDocument);
            nextRequestDate = this.addMonths(nextRequestDate);
          }
        }
        else if (pendingFormField.recurrence == eRecurrence.weekly) {
          let nextRequestDate: Date = new Date(pendingFormField.first_request_date);
          while (nextRequestDate <= today) {
            let newDocument: any = {
              status: 0,
              request_date: new Date(nextRequestDate),
              form_field_id: pendingFormField.id
            }

            newDocuments.push(newDocument);
            nextRequestDate = this.addWeeks(nextRequestDate);
          }
        }
        else if (pendingFormField.recurrence == eRecurrence.daily) {
          let nextRequestDate: Date = new Date(pendingFormField.first_request_date);
          while (nextRequestDate <= today) {
            let newDocument: any = {
              status: 0,
              request_date: new Date(nextRequestDate),
              form_field_id: pendingFormField.id
            }

            newDocuments.push(newDocument);
            nextRequestDate = this.addDays(nextRequestDate);
          }
        }
      }
    });


    await getConnection().createQueryBuilder().insert().into(Document).values(newDocuments).execute();
  }

  async getPendingDocuments(contractId: any): Promise<Document[]> {
    return await this.documentRepository.query(SELECT_PENDING_DOCUMENTS_FROM_CONTRACT);
  }
}
