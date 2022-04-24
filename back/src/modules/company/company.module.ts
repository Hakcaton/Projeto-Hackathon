import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/tools/auth/auth.module';
import { Contract } from '../contract/entities/contract.entity';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { Company } from './entities/company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company]),
    TypeOrmModule.forFeature([Contract]),
    forwardRef(() => AuthModule)
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [TypeOrmModule, CompanyService]
})
export class CompanyModule { }
