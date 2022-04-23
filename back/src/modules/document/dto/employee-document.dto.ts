import { DocumentDto } from "./pending-document.dto";

export class EmployeeDocumentDto {
    id: string;
    fullName: string;
    cpf: string;
    documents: DocumentDto[];
    active: boolean;

    constructor() {
        this.documents = [];
        this.active = true;
    }
}