export interface ContractModel {
  title: string;
  description: string;
  initialDate: string;
  finalDate?: string;
  companyCNPJ: string;
  documentsToValidate?: number;
}
