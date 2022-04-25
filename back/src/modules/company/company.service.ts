import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { DatabaseError } from 'pg-protocol';
import { eError } from 'src/tools/enum/error.definition';
import { QueryFailedError, Repository } from 'typeorm';
import { GetContractDto } from '../contract/dto/get-contract.dto';
import { Contract } from '../contract/entities/contract.entity';
import { User } from '../user/entities/user.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { GetCompanyDto } from './dto/get-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Contract)
    private contractRepository: Repository<Contract>,
  ) { }

  async getCompanies(res: Response): Promise<GetCompanyDto[]> {
    try {
      const rawCompanies: Company[] = await this.companyRepository.find();

      let companies: GetCompanyDto[] = rawCompanies.map((company: any) => {
        delete company.responsableUserId;
        return company;
      });

      return companies;
    } catch (err) {
      if (!res) {
        throw err;
      }
      res.status(HttpStatus.BAD_REQUEST);
    }
  }

  async getContracts(companyCNPJ: string, res: Response): Promise<GetContractDto[]> {
    try {
      const rawContracts: Contract[] = await this.contractRepository.find({
        companyCNPJ,
      });

      let contracts: GetContractDto[] = rawContracts.map((contract: any) => {
        delete contract.companyCNPJ;
        return contract;
      });

      return contracts;
    } catch (err) {
      if (!res) {
        throw err;
      }
      res.status(HttpStatus.BAD_REQUEST);
    }
  }

  async addCompany(data: CreateCompanyDto, userId: string, res?: Response): Promise<void> {
    try {
      if (data.companyData.fantasyName == null || data.companyData.cnpj == null || data.companyData.corporateName == null || data.companyData.stateRegistration == null) {
        throw eError.NOT_ENOUGTH_PARAMETERS;
      }

      let companyCreateData: any = data.companyData;
      companyCreateData.responsableUserId = userId;

      let company = this.companyRepository.create(companyCreateData);
      await this.companyRepository.save(company);
    }
    catch (err) {
      this.userRepository.delete({ id: userId });

      if (!res) {
        throw err;
      }
      if (err instanceof QueryFailedError) {
        const error = err.driverError as DatabaseError;
        switch (error.code) {
          case 'ER_DUP_ENTRY': {
            res.status(HttpStatus.CONFLICT);
            break;
          }

          default: {
            res.status(HttpStatus.BAD_REQUEST);
            break;
          }
        }
      }
      else {
        res.status(HttpStatus.BAD_REQUEST);
      }
    }
  }
}
