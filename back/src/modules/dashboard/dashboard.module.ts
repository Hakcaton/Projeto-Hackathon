import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '../company/entities/company.entity';
import { ContractModule } from '../contract/contract.module';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Company]),
        forwardRef(()=>ContractModule)
    ],
    controllers: [DashboardController],
    providers: [DashboardService]
})
export class DashboardModule {
}
