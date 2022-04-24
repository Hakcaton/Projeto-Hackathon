import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { GetCompanyDto } from './dto/get-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
    constructor(@InjectRepository(Company) private companyRepository: Repository<Company>) { }
    async getCompanies(res: Response): Promise<GetCompanyDto[]> {
        try {
            const rawCompanies: Company[] = await this.companyRepository.find();

            let companies: GetCompanyDto[] = rawCompanies.map((company: any) => {
                delete company.responsableUserId;
                return company;
            });

            return companies;
        }
        catch (err) {
            if (!res) {
                throw err;
            }
            res.status(HttpStatus.BAD_REQUEST);
        }
    }
}
