export interface ContractModel {
  id: string;
  title: string;
  description: string;
  initialDate: Date;
  finalDate?: Date;
  companyCNPJ: string;
  documentsToValidate?: number;
}
