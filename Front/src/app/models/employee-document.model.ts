import { DocumentModel } from './document.model';

export interface EmployeeDocumentModel {
  id: string;
  fullName: string;
  cpf: string;
  documents: DocumentModel[];
  active: boolean;
}
