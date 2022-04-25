import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

export class CreateCompanyDto {
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
