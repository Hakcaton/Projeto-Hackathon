import { Injectable } from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FormField } from '../form-field/entities/form-field.entity';
import { Document } from './entities/document.entities';
import { SELECT_EMPLOYEES_PENDING_DOCUMENTS_FROM_CONTRACT, SELECT_LATEST_DOCUMENTS_FROM_CONTRACT, SELECT_PENDING_DOCUMENTS_FROM_CONTRACT, SELECT_PENDING_FORM_FIELDS_FROM_CONTRACT } from 'src/queries/pending-documents.queries';
import { addDays, addMonths, addWeeks, addYears, removeHours } from 'src/tools/helpers/date-math.healper';
import { Employee } from '../employee/entities/employee.entity';
import { PendingEmployeeDocumentDto } from './dto/pending-employee-document.dto';
import { PendingDocumentDto } from './dto/pending-document.dto';
import { eDocumentRecurrence } from 'src/tools/enum/document-recurrence.definition';

@Injectable()
export class DocumentService {

  constructor(
    @InjectRepository(Document) private documentRepository: Repository<Document>,
    @InjectRepository(FormField) private formFieldRepository: Repository<FormField>,
    @InjectRepository(Employee) private employeeRepository: Repository<Employee>

  ) { }

  async generatePendingDocuments(contractId: string): Promise<void> {
    // Seleciona todos os form_fields do contrato que precisam ter pelo menos um documento gerado.
    const pendingFormFields: FormField[] = await this.formFieldRepository.query(SELECT_PENDING_FORM_FIELDS_FROM_CONTRACT, [contractId]);

    // Seleciona o último documento gerado de cada form_field do contrato.
    const latestRequestedDocuments: Document[] = await this.documentRepository.query(SELECT_LATEST_DOCUMENTS_FROM_CONTRACT);

    // salva o dia atual sem o horário.
    const today = removeHours(new Date());

    // Lista de documentos a serem gerados.
    let newDocuments: any = [];

    // Gera os novos documentos gerais pendentes.
    pendingFormFields.map(pendingFormField => {
      const latestDocument: Document = latestRequestedDocuments.find(doc => doc.form_field_id == pendingFormField.id);

      if (latestDocument) {
        if (pendingFormField.recurrence == eDocumentRecurrence.annually) {
          let nextRequestDate: Date = addYears(latestDocument.request_date);
          while (nextRequestDate <= today) {
            let newDocument: any = {
              status: 0,
              request_date: new Date(nextRequestDate),
              form_field_id: pendingFormField.id
            }

            newDocuments.push(newDocument);
            nextRequestDate = addYears(nextRequestDate);
          }
        }
        else if (pendingFormField.recurrence == eDocumentRecurrence.monthly) {
          let nextRequestDate: Date = addMonths(latestDocument.request_date);
          while (nextRequestDate <= today) {
            let newDocument: any = {
              status: 0,
              request_date: new Date(nextRequestDate),
              form_field_id: pendingFormField.id
            }

            newDocuments.push(newDocument);
            nextRequestDate = addMonths(nextRequestDate);
          }
        }
        else if (pendingFormField.recurrence == eDocumentRecurrence.weekly) {
          let nextRequestDate: Date = addWeeks(latestDocument.request_date);
          while (nextRequestDate <= today) {
            let newDocument: any = {
              status: 0,
              request_date: new Date(nextRequestDate),
              form_field_id: pendingFormField.id
            }

            newDocuments.push(newDocument);
            nextRequestDate = addWeeks(nextRequestDate);
          }
        }
        else if (pendingFormField.recurrence == eDocumentRecurrence.daily) {
          let nextRequestDate: Date = addDays(latestDocument.request_date);
          while (nextRequestDate <= today) {
            let newDocument: any = {
              status: 0,
              request_date: new Date(nextRequestDate),
              form_field_id: pendingFormField.id
            }

            newDocuments.push(newDocument);
            nextRequestDate = addDays(nextRequestDate);
          }
        }
      }
      else {
        if (pendingFormField.recurrence == eDocumentRecurrence.once) {
          let nextRequestDate: Date = new Date(pendingFormField.first_request_date);
          let newDocument: any = {
            status: 0,
            request_date: new Date(nextRequestDate),
            form_field_id: pendingFormField.id
          }

          newDocuments.push(newDocument);
          nextRequestDate = addYears(nextRequestDate);
        }
        else if (pendingFormField.recurrence == eDocumentRecurrence.annually) {
          let nextRequestDate: Date = new Date(pendingFormField.first_request_date);
          while (nextRequestDate <= today) {
            let newDocument: any = {
              status: 0,
              request_date: new Date(nextRequestDate),
              form_field_id: pendingFormField.id
            }

            newDocuments.push(newDocument);
            nextRequestDate = addYears(nextRequestDate);
          }
        }
        else if (pendingFormField.recurrence == eDocumentRecurrence.monthly) {
          let nextRequestDate: Date = new Date(pendingFormField.first_request_date);
          while (nextRequestDate <= today) {
            let newDocument: any = {
              status: 0,
              request_date: new Date(nextRequestDate),
              form_field_id: pendingFormField.id
            }

            newDocuments.push(newDocument);
            nextRequestDate = addMonths(nextRequestDate);
          }
        }
        else if (pendingFormField.recurrence == eDocumentRecurrence.weekly) {
          let nextRequestDate: Date = new Date(pendingFormField.first_request_date);
          while (nextRequestDate <= today) {
            let newDocument: any = {
              status: 0,
              request_date: new Date(nextRequestDate),
              form_field_id: pendingFormField.id
            }

            newDocuments.push(newDocument);
            nextRequestDate = addWeeks(nextRequestDate);
          }
        }
        else if (pendingFormField.recurrence == eDocumentRecurrence.daily) {
          let nextRequestDate: Date = new Date(pendingFormField.first_request_date);
          while (nextRequestDate <= today) {
            let newDocument: any = {
              status: 0,
              request_date: new Date(nextRequestDate),
              form_field_id: pendingFormField.id
            }

            newDocuments.push(newDocument);
            nextRequestDate = addDays(nextRequestDate);
          }
        }
      }
    });

    await getConnection().createQueryBuilder().insert().into(Document).values(newDocuments).execute();
  }

  async generateEmployeesPendingDocuments(contractId: string): Promise<void> {
    // PRECISA FAZER ESSA LÓGICA.
  }

  async getPendingDocuments(contractId: string): Promise<Document[]> {
    return await this.documentRepository.query(SELECT_PENDING_DOCUMENTS_FROM_CONTRACT, [contractId]);
  }

  async getEmployeesPendingDocuments(contractId: string): Promise<PendingEmployeeDocumentDto[]> {
    const employees: Employee[] = await this.employeeRepository.find({ contract_id: contractId });

    const rawDocuments = await getConnection().query(SELECT_EMPLOYEES_PENDING_DOCUMENTS_FROM_CONTRACT, [contractId]);

    let documents: PendingEmployeeDocumentDto[] = [];

    employees.forEach(employee => {
      const newEmployeePendingDoc: PendingEmployeeDocumentDto = new PendingEmployeeDocumentDto();
      newEmployeePendingDoc.id = employee.id;
      newEmployeePendingDoc.cpf = employee.cpf;
      newEmployeePendingDoc.fullName = employee.fullName;
      rawDocuments.filter(doc => doc.contract_id == contractId && doc.employee_id == employee.id)
        .map(rawDoc => {
          const newDoc: PendingDocumentDto = new PendingDocumentDto();
          newDoc.id = rawDoc.id;
          newDoc.status = rawDoc.status;
          newDoc.subtitle = rawDoc.subtitle;
          newDoc.tag_description = 'Tag';
          newDoc.title = rawDoc.title;
          newEmployeePendingDoc.documents.push(newDoc);
        })
      documents.push(newEmployeePendingDoc);
    })

    return documents;
  }
}
