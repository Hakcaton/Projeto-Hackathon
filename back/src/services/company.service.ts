import { Injectable } from '@nestjs/common';
import { InternalInsertCompanyDBModel } from 'src/models/internal-insert-company-db.model';

@Injectable()
export class CompanyService {
  async insertNewCompany(
    companyData: InternalInsertCompanyDBModel,
  ): Promise<boolean> {
    console.log(companyData);
    try {
      return true;
    } catch {
      return false;
    }
  }
}
