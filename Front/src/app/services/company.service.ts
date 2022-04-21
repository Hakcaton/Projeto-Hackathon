import { Injectable } from '@angular/core';
import { CompanyModel } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  companies: CompanyModel[] = [
    {
      companyData: {
        cnpj: '08.212.332/0001-41',
        corporateName: 'Integrativa Tecnologia E Gestao De Negocios Ltda',
        fantasyName: 'Integrativa',
        stateRegistration: '186.000.014.116',
      },
      responsibleData: {
        id: '123456789',
        name: 'Gustavo',
        lastName: 'Dias Borges Peres',
        cpf: '038.077.281-71',
        email: 'gdbperes@gmail.com',
        phoneNumber: '(61) 92000-0471',
      }
    },
    {
      companyData: {
        cnpj: '123',
        corporateName: 'CorporateName',
        fantasyName: 'FantasyName',
        stateRegistration: '123456',
      },
      responsibleData: {
        id: '123456789',
        name: 'Gustavo',
        lastName: 'Dias Borges Peres',
        cpf: '038.077.281-71',
        email: 'gdbperes@gmail.com',
        phoneNumber: '(61) 92000-0471',
      }
    },
    {
      companyData: {
        cnpj: '123',
        corporateName: 'CorporateName',
        fantasyName: 'FantasyName',
        stateRegistration: '123456',
      },
      responsibleData: {
        id: '123456789',
        name: 'Gustavo',
        lastName: 'Dias Borges Peres',
        cpf: '038.077.281-71',
        email: 'gdbperes@gmail.com',
        phoneNumber: '(61) 92000-0471',
      }
    },
    {
      companyData: {
        cnpj: '123',
        corporateName: 'CorporateName',
        fantasyName: 'FantasyName',
        stateRegistration: '123456',
      },
      responsibleData: {
        id: '123456789',
        name: 'Gustavo',
        lastName: 'Dias Borges Peres',
        cpf: '038.077.281-71',
        email: 'gdbperes@gmail.com',
        phoneNumber: '(61) 92000-0471',
      }
    },
    {
      companyData: {
        cnpj: '123',
        corporateName: 'CorporateName',
        fantasyName: 'FantasyName',
        stateRegistration: '123456',
      },
      responsibleData: {
        id: '123456789',
        name: 'Gustavo',
        lastName: 'Dias Borges Peres',
        cpf: '038.077.281-71',
        email: 'gdbperes@gmail.com',
        phoneNumber: '(61) 92000-0471',
      }
    },
    {
      companyData: {
        cnpj: '123',
        corporateName: 'CorporateName',
        fantasyName: 'FantasyName',
        stateRegistration: '123456',
      },
      responsibleData: {
        id: '123456789',
        name: 'Gustavo',
        lastName: 'Dias Borges Peres',
        cpf: '038.077.281-71',
        email: 'gdbperes@gmail.com',
        phoneNumber: '(61) 92000-0471',
      }
    },
    {
      companyData: {
        cnpj: '123',
        corporateName: 'CorporateName',
        fantasyName: 'FantasyName',
        stateRegistration: '123456',
      },
      responsibleData: {
        id: '123456789',
        name: 'Gustavo',
        lastName: 'Dias Borges Peres',
        cpf: '038.077.281-71',
        email: 'gdbperes@gmail.com',
        phoneNumber: '(61) 92000-0471',
      }
    },
    {
      companyData: {
        cnpj: '123',
        corporateName: 'CorporateName',
        fantasyName: 'FantasyName',
        stateRegistration: '123456',
      },
      responsibleData: {
        id: '123456789',
        name: 'Gustavo',
        lastName: 'Dias Borges Peres',
        cpf: '038.077.281-71',
        email: 'gdbperes@gmail.com',
        phoneNumber: '(61) 92000-0471',
      }
    },
    {
      companyData: {
        cnpj: '123',
        corporateName: 'CorporateName',
        fantasyName: 'FantasyName',
        stateRegistration: '123456',
      },
      responsibleData: {
        id: '123456789',
        name: 'Gustavo',
        lastName: 'Dias Borges Peres',
        cpf: '038.077.281-71',
        email: 'gdbperes@gmail.com',
        phoneNumber: '(61) 92000-0471',
      }
    },
    {
      companyData: {
        cnpj: '123',
        corporateName: 'CorporateName',
        fantasyName: 'FantasyName',
        stateRegistration: '123456',
      },
      responsibleData: {
        id: '123456789',
        name: 'Gustavo',
        lastName: 'Dias Borges Peres',
        cpf: '038.077.281-71',
        email: 'gdbperes@gmail.com',
        phoneNumber: '(61) 92000-0471',
      }
    },
    {
      companyData: {
        cnpj: '123',
        corporateName: 'Teste',
        fantasyName: 'FantasyName',
        stateRegistration: '123456',
      },
      responsibleData: {
        id: '123456789',
        name: 'Gustavo',
        lastName: 'Dias Borges Peres',
        cpf: '038.077.281-71',
        email: 'gdbperes@gmail.com',
        phoneNumber: '(61) 92000-0471',
      }
    },
    {
      companyData: {
        cnpj: '123',
        corporateName: 'Teste',
        fantasyName: 'FantasyName',
        stateRegistration: '123456',
      },
      responsibleData: {
        id: '123456789',
        name: 'Gustavo',
        lastName: 'Dias Borges Peres',
        cpf: '038.077.281-71',
        email: 'gdbperes@gmail.com',
        phoneNumber: '(61) 92000-0471',
      }
    },
    {
      companyData: {
        cnpj: '123',
        corporateName: 'Teste',
        fantasyName: 'FantasyName',
        stateRegistration: '123456',
      },
      responsibleData: {
        id: '123456789',
        name: 'Gustavo',
        lastName: 'Dias Borges Peres',
        cpf: '038.077.281-71',
        email: 'gdbperes@gmail.com',
        phoneNumber: '(61) 92000-0471',
      }
    },
    {
      companyData: {
        cnpj: '123',
        corporateName: 'Teste',
        fantasyName: 'FantasyName',
        stateRegistration: '123456',
      },
      responsibleData: {
        id: '123456789',
        name: 'Gustavo',
        lastName: 'Dias Borges Peres',
        cpf: '038.077.281-71',
        email: 'gdbperes@gmail.com',
        phoneNumber: '(61) 92000-0471',
      }
    },
    {
      companyData: {
        cnpj: '123',
        corporateName: 'Teste',
        fantasyName: 'FantasyName',
        stateRegistration: '123456',
      },
      responsibleData: {
        id: '123456789',
        name: 'Gustavo',
        lastName: 'Dias Borges Peres',
        cpf: '038.077.281-71',
        email: 'gdbperes@gmail.com',
        phoneNumber: '(61) 92000-0471',
      }
    },
    {
      companyData: {
        cnpj: '123',
        corporateName: 'Teste',
        fantasyName: 'FantasyName',
        stateRegistration: '123456',
      },
      responsibleData: {
        id: '123456789',
        name: 'Gustavo',
        lastName: 'Dias Borges Peres',
        cpf: '038.077.281-71',
        email: 'gdbperes@gmail.com',
        phoneNumber: '(61) 92000-0471',
      }
    },
    {
      companyData: {
        cnpj: '123',
        corporateName: 'Teste',
        fantasyName: 'FantasyName',
        stateRegistration: '123456',
      },
      responsibleData: {
        id: '123456789',
        name: 'Gustavo',
        lastName: 'Dias Borges Peres',
        cpf: '038.077.281-71',
        email: 'gdbperes@gmail.com',
        phoneNumber: '(61) 92000-0471',
      }
    },
    {
      companyData: {
        cnpj: '123',
        corporateName: 'Teste',
        fantasyName: 'FantasyName',
        stateRegistration: '123456',
      },
      responsibleData: {
        id: '123456789',
        name: 'Gustavo',
        lastName: 'Dias Borges Peres',
        cpf: '038.077.281-71',
        email: 'gdbperes@gmail.com',
        phoneNumber: '(61) 92000-0471',
      }
    },
    {
      companyData: {
        cnpj: '123',
        corporateName: 'Teste',
        fantasyName: 'FantasyName',
        stateRegistration: '123456',
      },
      responsibleData: {
        id: '123456789',
        name: 'Gustavo',
        lastName: 'Dias Borges Peres',
        cpf: '038.077.281-71',
        email: 'gdbperes@gmail.com',
        phoneNumber: '(61) 92000-0471',
      }
    },
    {
      companyData: {
        cnpj: '123',
        corporateName: 'Teste',
        fantasyName: 'FantasyName',
        stateRegistration: '123456',
      },
      responsibleData: {
        id: '123456789',
        name: 'Gustavo',
        lastName: 'Dias Borges Peres',
        cpf: '038.077.281-71',
        email: 'gdbperes@gmail.com',
        phoneNumber: '(61) 92000-0471',
      }
    },
    {
      companyData: {
        cnpj: '123',
        corporateName: 'XXX',
        fantasyName: 'FantasyName',
        stateRegistration: '123456',
      },
      responsibleData: {
        id: '123456789',
        name: 'Gustavo',
        lastName: 'Dias Borges Peres',
        cpf: '038.077.281-71',
        email: 'gdbperes@gmail.com',
        phoneNumber: '(61) 92000-0471',
      }
    },
    {
      companyData: {
        cnpj: '123',
        corporateName: 'Teste',
        fantasyName: 'FantasyName',
        stateRegistration: '123456',
      },
      responsibleData: {
        id: '123456789',
        name: 'Gustavo',
        lastName: 'Dias Borges Peres',
        cpf: '038.077.281-71',
        email: 'gdbperes@gmail.com',
        phoneNumber: '(61) 92000-0471',
      }
    }
  ];

  public getRegisteredCompanies(): CompanyModel[]{
    return this.companies
  }

}
