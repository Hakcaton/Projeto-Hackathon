import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SELECT_PENDING_FORM_FIELDS_FROM_CONTRACT, SELECT_LATEST_DOCUMENTS_FROM_CONTRACT, SELECT_EMPLOYEES_DOCUMENTS_FROM_CONTRACT, SELECT_EMPLOYEES_PENDING_DOCUMENTS_FROM_CONTRACT, SELECT_PENDING_DOCUMENTS_FROM_CONTRACT, SELECT_SENT_DOCUMENTS_FROM_CONTRACT, SELECT_EMPLOYEES_SENT_DOCUMENTS_FROM_CONTRACT } from 'src/queries/pending-documents.queries';
import { eDocumentRecurrence } from 'src/tools/enum/document-recurrence.definition';
import { removeHours, addYears, addMonths, addWeeks, addDays, DateToString } from 'src/tools/helpers/date.helper';
import { getConnection, QueryFailedError, Repository } from 'typeorm';
import { DocumentDto } from '../document/dto/pending-document.dto';
import { EmployeeDocumentDto } from '../document/dto/employee-document.dto';
import { Employee } from '../employee/entities/employee.entity';
import { FormField } from '../form-field/entities/form-field.entity';
import { Document } from '../document/entities/document.entities';
import { AddEmployeeDto } from './dto/add-employee.dto';
import { DatabaseError } from 'pg-protocol';
import { Response } from 'express';

@Injectable()
export class ContractService {
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
        pendingFormFields.forEach(pendingFormField => {
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
        const formFields: FormField[] = await this.formFieldRepository.find({ contract_id: contractId, individual: true });
        const employees: Employee[] = await this.employeeRepository.find({ contractId: contractId });
        const documents: Document[] = await this.formFieldRepository.query(SELECT_EMPLOYEES_DOCUMENTS_FROM_CONTRACT, [contractId]);

        let newDocuments: any = [];

        // Salva o dia atual sem o horário.
        const today = removeHours(new Date());

        employees.forEach(employee => {
            const employeeDocuments: Document[] = documents.filter(doc => doc.employee_id == employee.id);
            formFields.forEach(formField => {
                const fieldDocuments: Document[] = employeeDocuments.filter(doc => doc.form_field_id == formField.id);
                const latestDocument = fieldDocuments.sort((docA, docB) => {
                    return docB.request_date.getTime() - docA.request_date.getTime();
                })[0] || null;

                // Se não tiver nenhum documento gerado, irá gerar um  novo inicial e seus subsequentes.
                if (!latestDocument) {
                    if (formField.recurrence == eDocumentRecurrence.once) {
                        let newDocument: any = {
                            status: 0,
                            request_date: new Date(formField.first_request_date),
                            form_field_id: formField.id,
                            employee_id: employee.id
                        }
                        newDocuments.push(newDocument);
                    }
                    else if (formField.recurrence == eDocumentRecurrence.annually) {
                        let nextRequestDate: Date = new Date(formField.first_request_date);
                        while (nextRequestDate <= today) {
                            let newDocument: any = {
                                status: 0,
                                request_date: new Date(nextRequestDate),
                                form_field_id: formField.id,
                                employee_id: employee.id
                            }

                            newDocuments.push(newDocument);
                            nextRequestDate = addYears(nextRequestDate);
                        }
                    }
                    else if (formField.recurrence == eDocumentRecurrence.monthly) {
                        let nextRequestDate: Date = new Date(formField.first_request_date);
                        while (nextRequestDate <= today) {
                            let newDocument: any = {
                                status: 0,
                                request_date: new Date(nextRequestDate),
                                form_field_id: formField.id,
                                employee_id: employee.id
                            }

                            newDocuments.push(newDocument);
                            nextRequestDate = addMonths(nextRequestDate);
                        }
                    }
                    else if (formField.recurrence == eDocumentRecurrence.weekly) {
                        let nextRequestDate: Date = new Date(formField.first_request_date);
                        while (nextRequestDate <= today) {
                            let newDocument: any = {
                                status: 0,
                                request_date: new Date(nextRequestDate),
                                form_field_id: formField.id,
                                employee_id: employee.id
                            }

                            newDocuments.push(newDocument);
                            nextRequestDate = addWeeks(nextRequestDate);
                        }
                    }
                    else if (formField.recurrence == eDocumentRecurrence.daily) {
                        let nextRequestDate: Date = new Date(formField.first_request_date);
                        while (nextRequestDate <= today) {
                            let newDocument: any = {
                                status: 0,
                                request_date: new Date(nextRequestDate),
                                form_field_id: formField.id,
                                employee_id: employee.id
                            }

                            newDocuments.push(newDocument);
                            nextRequestDate = addDays(nextRequestDate);
                        }
                    }
                }
                // Se já tiver documento gerado, gera apenas os subsequentes.
                else {
                    if (formField.recurrence == eDocumentRecurrence.annually) {
                        let nextRequestDate: Date = new Date(addYears(latestDocument.request_date));
                        while (nextRequestDate <= today) {
                            let newDocument: any = {
                                status: 0,
                                request_date: new Date(nextRequestDate),
                                form_field_id: formField.id,
                                employee_id: employee.id
                            }

                            newDocuments.push(newDocument);
                            nextRequestDate = addYears(nextRequestDate);
                        }
                    }
                    else if (formField.recurrence == eDocumentRecurrence.monthly) {
                        let nextRequestDate: Date = new Date(addMonths(latestDocument.request_date));
                        while (nextRequestDate <= today) {
                            let newDocument: any = {
                                status: 0,
                                request_date: new Date(nextRequestDate),
                                form_field_id: formField.id,
                                employee_id: employee.id
                            }

                            newDocuments.push(newDocument);
                            nextRequestDate = addMonths(nextRequestDate);
                        }
                    }
                    else if (formField.recurrence == eDocumentRecurrence.weekly) {
                        let nextRequestDate: Date = new Date(addWeeks(latestDocument.request_date));
                        while (nextRequestDate <= today) {
                            let newDocument: any = {
                                status: 0,
                                request_date: new Date(nextRequestDate),
                                form_field_id: formField.id,
                                employee_id: employee.id
                            }

                            newDocuments.push(newDocument);
                            nextRequestDate = addWeeks(nextRequestDate);
                        }
                    }
                    else if (formField.recurrence == eDocumentRecurrence.daily) {
                        let nextRequestDate: Date = new Date(addDays(latestDocument.request_date));
                        while (nextRequestDate <= today) {
                            let newDocument: any = {
                                status: 0,
                                request_date: new Date(nextRequestDate),
                                form_field_id: formField.id,
                                employee_id: employee.id
                            }

                            newDocuments.push(newDocument);
                            nextRequestDate = addDays(nextRequestDate);
                        }
                    }
                }
            })
        })

        await getConnection().createQueryBuilder().insert().into(Document).values(newDocuments).execute();
    }

    async getPendingDocuments(contractId: string): Promise<DocumentDto[]> {
        const documents: Document[] = await this.documentRepository.query(SELECT_PENDING_DOCUMENTS_FROM_CONTRACT, [contractId]);
        const formFields: FormField[] = await this.formFieldRepository.find({ contract_id: contractId });
        let formattedDocuments: DocumentDto[] = []
        documents.forEach(rawDoc => {
            const formField: FormField = formFields.find(field => field.id == rawDoc.form_field_id);
            let newDoc: DocumentDto = new DocumentDto();
            newDoc.id = rawDoc.id;
            newDoc.title = formField.title;
            newDoc.subtitle = formField.subtitle;
            newDoc.subtitle = newDoc.subtitle.replace('<request-date>', DateToString(rawDoc.request_date));
            newDoc.status = rawDoc.status;
            newDoc.tooltipText = rawDoc.comment;
            newDoc.requestDate = rawDoc.request_date;
            formattedDocuments.push(newDoc);
        })

        return formattedDocuments;
    }

    async getSentDocuments(contractId: string): Promise<DocumentDto[]> {
        const documents: Document[] = await this.documentRepository.query(SELECT_SENT_DOCUMENTS_FROM_CONTRACT, [contractId]);
        const formFields: FormField[] = await this.formFieldRepository.find({ contract_id: contractId });
        let formattedDocuments: DocumentDto[] = []
        documents.forEach(rawDoc => {
            const formField: FormField = formFields.find(field => field.id == rawDoc.form_field_id);
            let newDoc: DocumentDto = new DocumentDto();
            newDoc.id = rawDoc.id;
            newDoc.title = formField.title;
            newDoc.subtitle = formField.subtitle;
            newDoc.subtitle = newDoc.subtitle.replace('<request-date>', DateToString(rawDoc.request_date));
            newDoc.status = rawDoc.status;
            newDoc.tooltipText = rawDoc.comment;
            newDoc.requestDate = rawDoc.request_date;
            newDoc.file.base64 = Buffer.from(rawDoc.file_stream).toString('base64');
            newDoc.file.name = rawDoc.file_name;
            formattedDocuments.push(newDoc);
        })

        return formattedDocuments;
    }

    async getEmployeesPendingDocuments(contractId: string): Promise<EmployeeDocumentDto[]> {
        const employees: Employee[] = await this.employeeRepository.find({ contractId: contractId });

        const rawDocuments = await getConnection().query(SELECT_EMPLOYEES_PENDING_DOCUMENTS_FROM_CONTRACT, [contractId]);

        let documents: EmployeeDocumentDto[] = [];

        employees.forEach(employee => {
            const newEmployeePendingDoc: EmployeeDocumentDto = new EmployeeDocumentDto();
            newEmployeePendingDoc.id = employee.id;
            newEmployeePendingDoc.cpf = employee.cpf;
            newEmployeePendingDoc.fullName = employee.fullName;
            newEmployeePendingDoc.active = employee.active;
            rawDocuments.filter(doc => doc.contract_id == contractId && doc.employee_id == employee.id)
                .forEach(rawDoc => {
                    const newDoc: DocumentDto = new DocumentDto();
                    newDoc.id = rawDoc.id;
                    newDoc.title = rawDoc.title;
                    newDoc.subtitle = rawDoc.subtitle;
                    newDoc.subtitle = newDoc.subtitle.replace('<request-date>', DateToString(rawDoc.request_date));
                    newDoc.status = rawDoc.status;
                    newDoc.tooltipText = rawDoc.comment;
                    newDoc.requestDate = rawDoc.request_date;
                    newEmployeePendingDoc.documents.push(newDoc);
                })
            documents.push(newEmployeePendingDoc);
        })

        return documents;
    }

    async getEmployeesSentDocuments(contractId: string): Promise<EmployeeDocumentDto[]> {
        const employees: Employee[] = await this.employeeRepository.find({ contractId: contractId });

        const rawDocuments = await getConnection().query(SELECT_EMPLOYEES_SENT_DOCUMENTS_FROM_CONTRACT, [contractId]);

        let documents: EmployeeDocumentDto[] = [];

        employees.forEach(employee => {
            const newEmployeeSentDoc: EmployeeDocumentDto = new EmployeeDocumentDto();
            newEmployeeSentDoc.id = employee.id;
            newEmployeeSentDoc.cpf = employee.cpf;
            newEmployeeSentDoc.fullName = employee.fullName;
            newEmployeeSentDoc.active = employee.active;
            rawDocuments.filter(doc => doc.contract_id == contractId && doc.employee_id == employee.id)
                .forEach(rawDoc => {
                    const newDoc: DocumentDto = new DocumentDto();
                    newDoc.id = rawDoc.id;
                    newDoc.title = rawDoc.title;
                    newDoc.subtitle = rawDoc.subtitle;
                    newDoc.subtitle = newDoc.subtitle.replace('<request-date>', DateToString(rawDoc.request_date));
                    newDoc.status = rawDoc.status;
                    newDoc.tooltipText = rawDoc.comment;
                    newDoc.requestDate = rawDoc.request_date;
                    newDoc.file.base64 = Buffer.from(rawDoc.file_stream).toString('base64');
                    newDoc.file.name = rawDoc.file_name;
                    newEmployeeSentDoc.documents.push(newDoc);
                })
            documents.push(newEmployeeSentDoc);
        })

        return documents;
    }

    async addEmployee(employee: AddEmployeeDto, res?: Response): Promise<Employee> {
        try {
            const newEmployee: Employee = this.employeeRepository.create(employee);
            await this.employeeRepository.save(newEmployee);
            return newEmployee;
        }
        catch (err) {
            if (!res) {
                throw err;
            }
            if (err instanceof QueryFailedError) {
                const error = err.driverError as DatabaseError;
                switch (error.code) {
                    case 'ER_DUP_ENTRY': {
                        res.status(HttpStatus.CONFLICT);
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

}
