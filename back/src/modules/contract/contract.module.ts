import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { Contract } from './entities/contract.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contract]),
  ],
  controllers: [ContractController],
  providers: [ContractService],
  exports: [TypeOrmModule, ContractService]
})
export class ContractModule {}
