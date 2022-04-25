export interface CreateCompanyModel {
  companyData: {
    corporateName: string;
    fantasyName: string;
    cnpj: string;
    stateRegistration: string;
  };

  userData: {
    email: string;
    phoneNumber: string;
    name: string;
    lastName: string;
    cpf: string;
  };
}
