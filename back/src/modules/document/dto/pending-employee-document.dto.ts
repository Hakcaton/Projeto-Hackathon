import { PendingDocumentDto } from "./pending-document.dto";

export class PendingEmployeeDocumentDto {
    id: string;
    fullName: string;
    cpf: string;
    documents: PendingDocumentDto[];

    constructor() {
        this.documents = [];
    }
}