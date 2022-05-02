import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EmployeeMovement } from "./entities/employee-movement.entity";

@Injectable()
export class EmployeeMovementService {
	constructor(
		@InjectRepository(EmployeeMovement) private employeeMovementRepository: Repository<EmployeeMovement>
	) {}

	async createMovement(employee_id: string) {
		try {
			const employeeExists = await this.employeeMovementRepository.findOne({
				employee_id,
				leave: null,
			});

			if (employeeExists) {
				// employee active
				return false;
			}

			const employee = this.employeeMovementRepository.create({
				join: new Date(),
				employee_id,
			});

			await this.employeeMovementRepository.save(employee);
			return true;
		} catch (err) {
			console.log(err);
			throw new Error(err);
		}
	}

	async updateMovement(employee_id: string) {
		const employeeExists = await this.employeeMovementRepository.findOne({ employee_id, leave: null });

		if (employeeExists) {
			await this.employeeMovementRepository.update({ id: employeeExists.id }, { leave: new Date() });
		} else {
			// employee not active
			throw new Error("Employee not active");
		}
	}
}
