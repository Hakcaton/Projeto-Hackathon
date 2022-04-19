import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeService } from '../employee/employee.service';
import { Employee } from '../employee/entities/employee.entity';
import { FormField } from '../form-field/entities/form-field.entity';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { Document } from './entities/document.entities';

@Module({
    imports: [
        TypeOrmModule.forFeature([Document]),
        TypeOrmModule.forFeature([FormField]),
        TypeOrmModule.forFeature([Employee])
      ],
      controllers: [DocumentController],
      providers: [DocumentService, EmployeeService],
      exports: [TypeOrmModule, DocumentService]
})
export class DocumentsModule {}
