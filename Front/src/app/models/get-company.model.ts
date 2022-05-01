import { GetResponsableModel } from "./get-responsable.model";

export interface GetCompanyModel {
    cnpj: string;
    corporateName: string;
    fantasyName: string;
    stateRegistration: string;
    responsable: GetResponsableModel;
  }
  