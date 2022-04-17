
import { Employee } from 'src/modules/employee/entities/employee.entity';
import { FormField } from 'src/modules/form-field/entities/form-field.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Document {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column() 
  status: eDocumentStatus;

  @Column()
  file_stream: string;
  
  @ManyToOne(() => Employee, employee => employee.id)
  @JoinColumn({name: 'employee_id'})
  employee: Employee;

  @ManyToOne(() => FormField, formField => formField.id)
  @JoinColumn({name: 'form_field_id'})
  formField: FormField;
}
