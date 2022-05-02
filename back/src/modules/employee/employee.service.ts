import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Response } from "express";
import { DatabaseError } from "pg-protocol";
import { eError } from "src/tools/enum/error.definition";
import { QueryFailedError, Repository } from "typeorm";
import { EmployeeMovementService } from "../employee-movement/employee-movement.service";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { Employee } from "./entities/employee.entity";

@Injectable()
export class EmployeeService {
	constructor(
		@InjectRepository(Employee) private employeeRepository: Repository<Employee>,
		private employeeMovementService: EmployeeMovementService
	) {}

	async updateEmployee(employee: UpdateEmployeeDto, res: Response): Promise<Employee> {
		try {
			const registeredEmployee = await this.employeeRepository.findOne({ id: employee.employeeId });

			if (!registeredEmployee) {
				throw eError.RESOURCE_NOT_FOUND;
			}

			if (employee.cpf) {
				registeredEmployee.cpf = employee.cpf;
			}

			if (employee.fullName) {
				registeredEmployee.fullName = employee.fullName;
			}

			await this.employeeRepository.save(registeredEmployee);

			res.status(HttpStatus.OK);

			return registeredEmployee;
		} catch (err) {
			if (!res) {
				throw err;
			}

			if (err instanceof QueryFailedError) {
				const error = err.driverError as DatabaseError;
				switch (error.code) {
					case "ER_DUP_ENTRY": {
						res.status(HttpStatus.CONFLICT);
						break;
					}

					default: {
						res.status(HttpStatus.BAD_REQUEST);
						break;
					}
				}
			} else {
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

	async removeEmployee(employeeId: string, res: Response) {
		try {
			const registeredEmployee = await this.employeeRepository.findOne({ id: employeeId });

			if (!registeredEmployee) {
				throw eError.RESOURCE_NOT_FOUND;
			}
			registeredEmployee.active = false;

			await this.employeeRepository.save(registeredEmployee);

			await this.employeeMovementService.updateMovement(registeredEmployee.id);
			return registeredEmployee;
		} catch (err) {
			if (!res) {
				throw err;
			}

			if (err instanceof QueryFailedError) {
				const error = err.driverError as DatabaseError;
				switch (error.code) {
					case "ER_DUP_ENTRY": {
						res.status(HttpStatus.CONFLICT);
						break;
					}

					default: {
						res.status(HttpStatus.BAD_REQUEST);
						break;
					}
				}
			} else {
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
}
