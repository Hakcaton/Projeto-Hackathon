import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { raw, Response } from 'express';
import { DatabaseError } from 'pg-protocol';
import { eError } from 'src/tools/enum/error.definition';
import { QueryFailedError, Repository } from 'typeorm';
import { GetContractDto } from '../contract/dto/get-contract.dto';
import { Contract } from '../contract/entities/contract.entity';
import { User } from '../user/entities/user.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CreateContractDto } from './dto/create-contract.dto';
import { GetCompanyDto, GetResponsableModel } from './dto/get-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Contract)
    private contractRepository: Repository<Contract>,
  ) { }

  async getCompanyByResponsableUser(responsableUserId: string, res?: Response): Promise<Company> {
    try {
      const rawCompany: Company = await this.companyRepository.findOne({ responsableUserId });

      return rawCompany;
    } catch (err) {
      if (!res) {
        throw err;
      }
      res.status(HttpStatus.BAD_REQUEST);
    }
  }

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

  async getCompany(companyCNPJ: string, res: Response): Promise<GetCompanyDto> {
    try {
      const rawCompany: any = await this.companyRepository.findOne({ cnpj: companyCNPJ });
      const rawResponsable: User = await this.userRepository.findOne({ id: rawCompany.responsableUserId });

      let company: GetCompanyDto = <GetCompanyDto>rawCompany;
      company.responsable = <GetResponsableModel>rawResponsable;

      return company;
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

  async updateCompany(company: UpdateCompanyDto, res: Response): Promise<GetCompanyDto> {
    try {
      const registeredCompany = await this.companyRepository.findOne({ cnpj: company.companyData.cnpj });
      const registeredUser = await this.userRepository.findOne({ id: registeredCompany.responsableUserId });

      if (!registeredCompany) {
        throw eError.RESOURCE_NOT_FOUND;
      }

      if (company.companyData.corporateName) {
        registeredCompany.corporateName = company.companyData.corporateName;
      }
      if (company.companyData.fantasyName) {
        registeredCompany.fantasyName = company.companyData.fantasyName;
      }
      if (company.companyData.stateRegistration) {
        registeredCompany.stateRegistration = company.companyData.stateRegistration;
      }

      if (company.userData.cpf) {
        registeredUser.cpf = company.userData.cpf;
      }
      if (company.userData.phoneNumber) {
        registeredUser.phoneNumber = company.userData.phoneNumber;
      }
      if (company.userData.email) {
        registeredUser.email = company.userData.email;
      }
      if (company.userData.name) {
        registeredUser.name = company.userData.name;
      }
      if (company.userData.lastName) {
        registeredUser.lastName = company.userData.lastName;
      }



      await this.companyRepository.save(registeredCompany);
      await this.userRepository.save(registeredUser);

      return this.getCompany(company.companyData.cnpj, res);
    }
    catch (err) {
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
        switch (err) {
          case eError.RESOURCE_NOT_FOUND: {
            res.status(HttpStatus.NOT_FOUND);
            break;
          }

          default: {
            res.status(HttpStatus.BAD_REQUEST);
            break;
          }
        }
      }
    }
  }

  async addContract(contract: CreateContractDto, res?: Response): Promise<GetContractDto> {
    try {
      const newContract: Contract = this.contractRepository.create(contract);
      return await this.contractRepository.save(newContract);
    }
    catch (err) {
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
    }
  }
}
