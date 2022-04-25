export interface ContractModel {
  id: string;
  title: string;
  description: string;
  initialDate: string;
  finalDate?: string;
  companyCNPJ: string;
  documentsToValidate?: number;
}
