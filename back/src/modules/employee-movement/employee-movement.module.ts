import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeHistoryController } from './employee-movement.controller';
import { EmployeeMovementService } from './employee-movement.service';
import { EmployeeMovement } from './entities/employee-movement.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmployeeMovement]),
  ],
  controllers: [EmployeeHistoryController],
  providers: [EmployeeMovementService],
  exports: [TypeOrmModule, EmployeeMovementService]
})
export class EmployeeHistoryModule {}