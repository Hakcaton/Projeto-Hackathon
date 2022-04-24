import { Injectable } from '@angular/core';
import { ContractModel } from '../models/contract.model';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  contracts: ContractModel[] = [
    {
      title: 'Contrato A',
      description: 'A Lívia não sai comigo',
      initialDate: '20/01/2001',
      companyCNPJ: '12345678910',
      documentsToValidate: 27
    },
    {
      title: 'Contrato B',
      description: 'A Lívia só me maltrata',
      initialDate: '20/01/2001',
      finalDate: '14/01/2002',
      companyCNPJ: '12345678910'
    }
  ]

  getRegisteredContracts() {
    return this.contracts;
  }

  constructor() { }
}
