export interface ICompanyDataModel {
  companyData: {
    id: number;
    razaoSocial: string;
    nomeFantasia: string;
    cnpj: string;
    inscricaoEstadual: string;
  };
  responsibleData: {
    nome: string;
    sobreNome: string;
    cpf: string;
    email: string;
    celular: string;
  };
}
