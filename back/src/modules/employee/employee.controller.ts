import { Body, Controller, Delete, Param, Patch, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeService } from './employee.service';

@Controller('employees')
export class EmployeeController {
    constructor(private employeeService: EmployeeService) { }

    @Patch(':employeeId')
    async updateEmployee(@Body() employee: UpdateEmployeeDto, @Param() params: any, @Res() res: Response) {
        employee.employeeId = params.employeeId;
        res.send(await this.employeeService.updateEmployee(employee, res));
    }

    @Delete(':employeeId')
    async removeEmployee(@Param() params: any, @Res() res: Response){
        await this.employeeService.removeEmployee(params.employeeId, res);
        res.send();
    }
}
