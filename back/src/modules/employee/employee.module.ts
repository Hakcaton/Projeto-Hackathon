import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmployeeMovementModule } from "../employee-movement/employee-movement.module";
import { EmployeeController } from "./employee.controller";
import { EmployeeService } from "./employee.service";
import { Employee } from "./entities/employee.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Employee]),
		EmployeeMovementModule],
	controllers: [EmployeeController],
	providers: [EmployeeService],
	exports: [TypeOrmModule, EmployeeService],
})
export class EmployeeModule { }
