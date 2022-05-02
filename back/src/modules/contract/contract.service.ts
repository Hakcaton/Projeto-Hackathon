import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
	SELECT_PENDING_FORM_FIELDS_FROM_CONTRACT,
	SELECT_LATEST_DOCUMENTS_FROM_CONTRACT,
	SELECT_EMPLOYEES_DOCUMENTS_FROM_CONTRACT,
	SELECT_EMPLOYEES_PENDING_DOCUMENTS_FROM_CONTRACT,
	SELECT_PENDING_DOCUMENTS_FROM_CONTRACT,
	SELECT_SENT_DOCUMENTS_FROM_CONTRACT,
	SELECT_EMPLOYEES_SENT_DOCUMENTS_FROM_CONTRACT,
} from "src/queries/pending-documents.queries";
import { eDocumentRecurrence } from "src/tools/enum/document-recurrence.definition";
import {
	removeHours,
	addYears,
	addMonths,
	addWeeks,
	addDays,
	DateToString,
} from "src/tools/helpers/date.helper";
import { getConnection, QueryFailedError, Repository } from "typeorm";
import { DocumentDto } from "../document/dto/pending-document.dto";
import { EmployeeDocumentDto } from "../document/dto/employee-document.dto";
import { Employee } from "../employee/entities/employee.entity";
import { FormField } from "../form-field/entities/form-field.entity";
import { Document } from "../document/entities/document.entities";
import { AddEmployeeDto } from "./dto/add-employee.dto";
import { DatabaseError } from "pg-protocol";
import { Response } from "express";
import { GetFormFieldDto } from "./dto/get-formField.dto";
import { AddFormFieldDto } from "./dto/add-formField.dto";
import { GetContractDto } from "./dto/get-contract.dto";
import { Contract } from "./entities/contract.entity";
import { eError } from "src/tools/enum/error.definition";
import { UpdateContractDto } from "./dto/update-contract.dto";
import { EmployeeMovementService } from "../employee-movement/employee-movement.service";

@Injectable()
export class ContractService {
	constructor(
		@InjectRepository(Document)
		private documentRepository: Repository<Document>,
		@InjectRepository(FormField)
		private formFieldRepository: Repository<FormField>,
		@InjectRepository(Employee)
		private employeeRepository: Repository<Employee>,
		@InjectRepository(Contract)
		private contractRepository: Repository<Contract>,

		private employeeMovementService: EmployeeMovementService
	) {}

	async generatePendingDocuments(contractId: string): Promise<void> {
		// Seleciona todos os form_fields do contrato que precisam ter pelo menos um documento gerado.
		const pendingFormFields: FormField[] = await this.formFieldRepository.query(
			SELECT_PENDING_FORM_FIELDS_FROM_CONTRACT,
			[contractId]
		);

		// Seleciona o último documento gerado de cada form_field do contrato.
		const latestRequestedDocuments: Document[] = await this.documentRepository.query(
			SELECT_LATEST_DOCUMENTS_FROM_CONTRACT
		);

		// salva o dia atual sem o horário.
		const today = removeHours(new Date());

		// Lista de documentos a serem gerados.
		let newDocuments: any = [];

		// Gera os novos documentos gerais pendentes.
		pendingFormFields.forEach((pendingFormField) => {
			const latestDocument: Document = latestRequestedDocuments.find(
				(doc) => doc.form_field_id == pendingFormField.id
			);

			if (latestDocument) {
				if (pendingFormField.recurrence == eDocumentRecurrence.annually) {
					let nextRequestDate: Date = addYears(latestDocument.request_date);
					while (nextRequestDate <= today) {
						let newDocument: any = {
							status: 0,
							request_date: new Date(nextRequestDate),
							form_field_id: pendingFormField.id,
						};

						newDocuments.push(newDocument);
						nextRequestDate = addYears(nextRequestDate);
					}
				} else if (pendingFormField.recurrence == eDocumentRecurrence.monthly) {
					let nextRequestDate: Date = addMonths(latestDocument.request_date);
					while (nextRequestDate <= today) {
						let newDocument: any = {
							status: 0,
							request_date: new Date(nextRequestDate),
							form_field_id: pendingFormField.id,
						};

						newDocuments.push(newDocument);
						nextRequestDate = addMonths(nextRequestDate);
					}
				} else if (pendingFormField.recurrence == eDocumentRecurrence.weekly) {
					let nextRequestDate: Date = addWeeks(latestDocument.request_date);
					while (nextRequestDate <= today) {
						let newDocument: any = {
							status: 0,
							request_date: new Date(nextRequestDate),
							form_field_id: pendingFormField.id,
						};

						newDocuments.push(newDocument);
						nextRequestDate = addWeeks(nextRequestDate);
					}
				} else if (pendingFormField.recurrence == eDocumentRecurrence.daily) {
					let nextRequestDate: Date = addDays(latestDocument.request_date);
					while (nextRequestDate <= today) {
						let newDocument: any = {
							status: 0,
							request_date: new Date(nextRequestDate),
							form_field_id: pendingFormField.id,
						};

						newDocuments.push(newDocument);
						nextRequestDate = addDays(nextRequestDate);
					}
				}
			} else {
				if (pendingFormField.recurrence == eDocumentRecurrence.once) {
					let nextRequestDate: Date = new Date(pendingFormField.firstRequestDate);
					let newDocument: any = {
						status: 0,
						request_date: new Date(nextRequestDate),
						form_field_id: pendingFormField.id,
					};

					newDocuments.push(newDocument);
					nextRequestDate = addYears(nextRequestDate);
				} else if (pendingFormField.recurrence == eDocumentRecurrence.annually) {
					let nextRequestDate: Date = new Date(pendingFormField.firstRequestDate);
					while (nextRequestDate <= today) {
						let newDocument: any = {
							status: 0,
							request_date: new Date(nextRequestDate),
							form_field_id: pendingFormField.id,
						};

						newDocuments.push(newDocument);
						nextRequestDate = addYears(nextRequestDate);
					}
				} else if (pendingFormField.recurrence == eDocumentRecurrence.monthly) {
					let nextRequestDate: Date = new Date(pendingFormField.firstRequestDate);
					while (nextRequestDate <= today) {
						let newDocument: any = {
							status: 0,
							request_date: new Date(nextRequestDate),
							form_field_id: pendingFormField.id,
						};

						newDocuments.push(newDocument);
						nextRequestDate = addMonths(nextRequestDate);
					}
				} else if (pendingFormField.recurrence == eDocumentRecurrence.weekly) {
					let nextRequestDate: Date = new Date(pendingFormField.firstRequestDate);
					while (nextRequestDate <= today) {
						let newDocument: any = {
							status: 0,
							request_date: new Date(nextRequestDate),
							form_field_id: pendingFormField.id,
						};

						newDocuments.push(newDocument);
						nextRequestDate = addWeeks(nextRequestDate);
					}
				} else if (pendingFormField.recurrence == eDocumentRecurrence.daily) {
					let nextRequestDate: Date = new Date(pendingFormField.firstRequestDate);
					while (nextRequestDate <= today) {
						let newDocument: any = {
							status: 0,
							request_date: new Date(nextRequestDate),
							form_field_id: pendingFormField.id,
						};

						newDocuments.push(newDocument);
						nextRequestDate = addDays(nextRequestDate);
					}
				}
			}
		});

		await getConnection().createQueryBuilder().insert().into(Document).values(newDocuments).execute();
	}

	async generateEmployeesPendingDocuments(contractId: string): Promise<void> {
		const formFields: FormField[] = await this.formFieldRepository.find({
			contractId: contractId,
			individual: true,
		});
		const employees: Employee[] = await this.employeeRepository.find({
			contractId: contractId,
		});
		const documents: Document[] = await this.formFieldRepository.query(
			SELECT_EMPLOYEES_DOCUMENTS_FROM_CONTRACT,
			[contractId]
		);

		let newDocuments: any = [];

		// Salva o dia atual sem o horário.
		const today = removeHours(new Date());

		employees.forEach((employee) => {
			const employeeDocuments: Document[] = documents.filter((doc) => doc.employee_id == employee.id);
			formFields.forEach((formField) => {
				const fieldDocuments: Document[] = employeeDocuments.filter(
					(doc) => doc.form_field_id == formField.id
				);
				const latestDocument =
					fieldDocuments.sort((docA, docB) => {
						return docB.request_date.getTime() - docA.request_date.getTime();
					})[0] || null;

				// Se não tiver nenhum documento gerado, irá gerar um  novo inicial e seus subsequentes.
				if (!latestDocument) {
					if (formField.recurrence == eDocumentRecurrence.once) {
						let newDocument: any = {
							status: 0,
							request_date: new Date(formField.firstRequestDate),
							form_field_id: formField.id,
							employee_id: employee.id,
						};
						newDocuments.push(newDocument);
					} else if (formField.recurrence == eDocumentRecurrence.annually) {
						let nextRequestDate: Date = new Date(formField.firstRequestDate);
						while (nextRequestDate <= today) {
							let newDocument: any = {
								status: 0,
								request_date: new Date(nextRequestDate),
								form_field_id: formField.id,
								employee_id: employee.id,
							};

							newDocuments.push(newDocument);
							nextRequestDate = addYears(nextRequestDate);
						}
					} else if (formField.recurrence == eDocumentRecurrence.monthly) {
						let nextRequestDate: Date = new Date(formField.firstRequestDate);
						while (nextRequestDate <= today) {
							let newDocument: any = {
								status: 0,
								request_date: new Date(nextRequestDate),
								form_field_id: formField.id,
								employee_id: employee.id,
							};

							newDocuments.push(newDocument);
							nextRequestDate = addMonths(nextRequestDate);
						}
					} else if (formField.recurrence == eDocumentRecurrence.weekly) {
						let nextRequestDate: Date = new Date(formField.firstRequestDate);
						while (nextRequestDate <= today) {
							let newDocument: any = {
								status: 0,
								request_date: new Date(nextRequestDate),
								form_field_id: formField.id,
								employee_id: employee.id,
							};

							newDocuments.push(newDocument);
							nextRequestDate = addWeeks(nextRequestDate);
						}
					} else if (formField.recurrence == eDocumentRecurrence.daily) {
						let nextRequestDate: Date = new Date(formField.firstRequestDate);
						while (nextRequestDate <= today) {
							let newDocument: any = {
								status: 0,
								request_date: new Date(nextRequestDate),
								form_field_id: formField.id,
								employee_id: employee.id,
							};

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
								employee_id: employee.id,
							};

							newDocuments.push(newDocument);
							nextRequestDate = addYears(nextRequestDate);
						}
					} else if (formField.recurrence == eDocumentRecurrence.monthly) {
						let nextRequestDate: Date = new Date(addMonths(latestDocument.request_date));
						while (nextRequestDate <= today) {
							let newDocument: any = {
								status: 0,
								request_date: new Date(nextRequestDate),
								form_field_id: formField.id,
								employee_id: employee.id,
							};

							newDocuments.push(newDocument);
							nextRequestDate = addMonths(nextRequestDate);
						}
					} else if (formField.recurrence == eDocumentRecurrence.weekly) {
						let nextRequestDate: Date = new Date(addWeeks(latestDocument.request_date));
						while (nextRequestDate <= today) {
							let newDocument: any = {
								status: 0,
								request_date: new Date(nextRequestDate),
								form_field_id: formField.id,
								employee_id: employee.id,
							};

							newDocuments.push(newDocument);
							nextRequestDate = addWeeks(nextRequestDate);
						}
					} else if (formField.recurrence == eDocumentRecurrence.daily) {
						let nextRequestDate: Date = new Date(addDays(latestDocument.request_date));
						while (nextRequestDate <= today) {
							let newDocument: any = {
								status: 0,
								request_date: new Date(nextRequestDate),
								form_field_id: formField.id,
								employee_id: employee.id,
							};

							newDocuments.push(newDocument);
							nextRequestDate = addDays(nextRequestDate);
						}
					}
				}
			});
		});

		await getConnection().createQueryBuilder().insert().into(Document).values(newDocuments).execute();
	}

	async getPendingDocuments(contractId: string): Promise<DocumentDto[]> {
		const documents: Document[] = await this.documentRepository.query(
			SELECT_PENDING_DOCUMENTS_FROM_CONTRACT,
			[contractId]
		);
		const formFields: FormField[] = await this.formFieldRepository.find({
			contractId: contractId,
		});
		let formattedDocuments: DocumentDto[] = [];
		documents.forEach((rawDoc) => {
			const formField: FormField = formFields.find((field) => field.id == rawDoc.form_field_id);
			let newDoc: DocumentDto = new DocumentDto();
			newDoc.id = rawDoc.id;
			newDoc.title = formField.title;
			newDoc.subtitle = formField.subtitle;
			newDoc.subtitle = newDoc.subtitle.replace("<request-date>", DateToString(rawDoc.request_date));
			newDoc.status = rawDoc.status;
			newDoc.tooltipText = rawDoc.comment;
			newDoc.requestDate = rawDoc.request_date;
			formattedDocuments.push(newDoc);
		});

		return formattedDocuments;
	}

	async getSentDocuments(contractId: string): Promise<DocumentDto[]> {
		const documents: Document[] = await this.documentRepository.query(
			SELECT_SENT_DOCUMENTS_FROM_CONTRACT,
			[contractId]
		);
		const formFields: FormField[] = await this.formFieldRepository.find({
			contractId: contractId,
		});
		let formattedDocuments: DocumentDto[] = [];
		documents.forEach((rawDoc) => {
			const formField: FormField = formFields.find((field) => field.id == rawDoc.form_field_id);
			let newDoc: DocumentDto = new DocumentDto();
			newDoc.id = rawDoc.id;
			newDoc.title = formField.title;
			newDoc.subtitle = formField.subtitle;
			newDoc.subtitle = newDoc.subtitle.replace("<request-date>", DateToString(rawDoc.request_date));
			newDoc.status = rawDoc.status;
			newDoc.tooltipText = rawDoc.comment;
			newDoc.requestDate = rawDoc.request_date;
			newDoc.file.base64 = Buffer.from(rawDoc.file_stream).toString("base64");
			newDoc.file.format = rawDoc.file_format;

			formattedDocuments.push(newDoc);
		});

		return formattedDocuments;
	}

	async getEmployeesPendingDocuments(contractId: string): Promise<EmployeeDocumentDto[]> {
		const employees: Employee[] = await this.employeeRepository.find({
			contractId: contractId,
		});

		const rawDocuments = await getConnection().query(SELECT_EMPLOYEES_PENDING_DOCUMENTS_FROM_CONTRACT, [
			contractId,
		]);

		let documents: EmployeeDocumentDto[] = [];

		employees.forEach((employee) => {
			const newEmployeePendingDoc: EmployeeDocumentDto = new EmployeeDocumentDto();
			newEmployeePendingDoc.id = employee.id;
			newEmployeePendingDoc.cpf = employee.cpf;
			newEmployeePendingDoc.fullName = employee.fullName;
			newEmployeePendingDoc.active = employee.active;
			rawDocuments
				.filter((doc) => doc.contract_id == contractId && doc.employee_id == employee.id)
				.forEach((rawDoc) => {
					const newDoc: DocumentDto = new DocumentDto();
					newDoc.id = rawDoc.id;
					newDoc.title = rawDoc.title;
					newDoc.subtitle = rawDoc.subtitle;
					newDoc.subtitle = newDoc.subtitle.replace(
						"<request-date>",
						DateToString(rawDoc.request_date)
					);
					newDoc.status = rawDoc.status;
					newDoc.tooltipText = rawDoc.comment;
					newDoc.requestDate = rawDoc.request_date;
					newEmployeePendingDoc.documents.push(newDoc);
				});
			documents.push(newEmployeePendingDoc);
		});

		return documents;
	}

	async getEmployeesSentDocuments(contractId: string): Promise<EmployeeDocumentDto[]> {
		const employees: Employee[] = await this.employeeRepository.find({
			contractId: contractId,
		});

		const rawDocuments = await getConnection().query(SELECT_EMPLOYEES_SENT_DOCUMENTS_FROM_CONTRACT, [
			contractId,
		]);

		let documents: EmployeeDocumentDto[] = [];

		employees.forEach((employee) => {
			const newEmployeeSentDoc: EmployeeDocumentDto = new EmployeeDocumentDto();
			newEmployeeSentDoc.id = employee.id;
			newEmployeeSentDoc.cpf = employee.cpf;
			newEmployeeSentDoc.fullName = employee.fullName;
			newEmployeeSentDoc.active = employee.active;
			rawDocuments
				.filter((doc) => doc.contract_id == contractId && doc.employee_id == employee.id)
				.forEach((rawDoc) => {
					const newDoc: DocumentDto = new DocumentDto();
					newDoc.id = rawDoc.id;
					newDoc.title = rawDoc.title;
					newDoc.subtitle = rawDoc.subtitle;
					newDoc.subtitle = newDoc.subtitle.replace(
						"<request-date>",
						DateToString(rawDoc.request_date)
					);
					newDoc.status = rawDoc.status;
					newDoc.tooltipText = rawDoc.comment;
					newDoc.requestDate = rawDoc.request_date;
					newDoc.file.base64 = Buffer.from(rawDoc.file_stream).toString("base64");
					newDoc.file.format = rawDoc.file_name;
					newEmployeeSentDoc.documents.push(newDoc);
				});
			documents.push(newEmployeeSentDoc);
		});

		return documents;
	}

	async addEmployee(employee: AddEmployeeDto, res?: Response): Promise<Employee> {
		try {
			let registeredEmployee = await this.employeeRepository.findOne({ cpf: employee.cpf });
			if (!registeredEmployee) {
				registeredEmployee = this.employeeRepository.create(employee);
				await this.employeeRepository.save(registeredEmployee);
			}

			const verifyEmployee = await this.employeeMovementService.createMovement(registeredEmployee.id);
			if (!verifyEmployee) throw new Error();
			return registeredEmployee;
		} catch (err) {
			if (!res) {
				throw err;
			}
			if (err instanceof QueryFailedError) {
				const error = err.driverError as DatabaseError;
				switch (error.code) {
					case "ER_DUP_ENTRY": {
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

	async getFormFields(contractId: string, res: Response): Promise<GetFormFieldDto[]> {
		try {
			const rawFormFields = await this.formFieldRepository.find({
				contractId: contractId,
			});

			let formFields: GetFormFieldDto[] = rawFormFields.map((formField: any) => {
				delete formField.contract_id;
				return formField;
			});

			return formFields;
		} catch (err) {
			if (!res) {
				throw err;
			}
			res.status(HttpStatus.BAD_REQUEST);
		}
	}

	async addFormField(
		contractId: string,
		formField: AddFormFieldDto,
		res: Response
	): Promise<GetFormFieldDto> {
		try {
			const newFormField = this.formFieldRepository.create({ contractId: contractId, ...formField });
			await this.formFieldRepository.save(newFormField);

			return newFormField;
		} catch (err) {
			if (!res) {
				throw err;
			}
			if (err instanceof QueryFailedError) {
				const error = err.driverError as DatabaseError;
				switch (error.code) {
					case "ER_DUP_ENTRY": {
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

	async getContract(contractId: string, res?: Response): Promise<GetContractDto> {
		try {
			const rawContract: Contract = await this.contractRepository.findOne({ id: contractId });

			if (!rawContract) {
				throw eError.NOT_ENOUGTH_PARAMETERS;
			}

			let contract: GetContractDto = <GetContractDto>rawContract;

			return contract;
		} catch (err) {
			if (!res) {
				throw err;
			}
			switch (err) {
				case eError.NOT_ENOUGTH_PARAMETERS:
					res.status(HttpStatus.NOT_FOUND);
					break;

				default:
					res.status(HttpStatus.BAD_REQUEST);
					break;
			}
		}
	}

	async updateContract(contract: UpdateContractDto, res: Response): Promise<GetContractDto> {
		try {
			const registeredContract = await this.contractRepository.findOne({ id: contract.id });

			if (!registeredContract) {
				throw eError.RESOURCE_NOT_FOUND;
			}

			registeredContract.title = contract.title;
			registeredContract.description = contract.description;

			return this.contractRepository.save(registeredContract);
		} catch (err) {
			if (!res) {
				throw err;
			}

			if (err instanceof QueryFailedError) {
				const error = err.driverError as DatabaseError;
				switch (error.code) {
					case "ER_DUP_ENTRY": {
						res.status(HttpStatus.CONFLICT);
						break;
					}

					default: {
						res.status(HttpStatus.BAD_REQUEST);
						break;
					}
				}
			} else {
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

	async terminateContract(contractId: string, res?: Response): Promise<GetContractDto> {
		try {
			const rawContract: Contract = await this.contractRepository.findOne({ id: contractId });

			if (!rawContract) {
				throw eError.NOT_ENOUGTH_PARAMETERS;
			}

			rawContract.finalDate = new Date();

			await this.contractRepository.save(rawContract);

			let contract: GetContractDto = <GetContractDto>rawContract;

			return contract;
		} catch (err) {
			if (!res) {
				throw err;
			}
			switch (err) {
				case eError.NOT_ENOUGTH_PARAMETERS:
					res.status(HttpStatus.NOT_FOUND);
					break;

				default:
					res.status(HttpStatus.BAD_REQUEST);
					break;
			}
		}
	}
}
