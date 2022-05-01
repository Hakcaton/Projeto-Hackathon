export class GetCompanyDto {
    cnpj: string;
    corporateName: string;
    fantasyName: string;
    stateRegistration: string;
    responsable: GetResponsableModel
}

export interface GetResponsableModel {
    id: string;
    name: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    cpf: string;
}