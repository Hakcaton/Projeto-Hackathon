import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/tools/auth/auth.module';
import { Contract } from '../contract/entities/contract.entity';
import { UserModule } from '../user/users.module';
import { UserService } from '../user/users.service';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { Company } from './entities/company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company]),
    TypeOrmModule.forFeature([Contract]),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [TypeOrmModule, CompanyService],
})
export class CompanyModule {}
