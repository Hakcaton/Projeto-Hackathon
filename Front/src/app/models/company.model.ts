export interface CompanyModel {
  companyData: {
    cnpj: string;
    corporateName: string;
    fantasyName: string;
    stateRegistration: string;
  };
  responsibleData: {
    id: string;
    name: string;
    lastName: string;
    cpf: string;
    email: string;
    phoneNumber: string;
  };
}
