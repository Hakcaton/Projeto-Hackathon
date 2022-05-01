
import { Employee } from 'src/modules/employee/entities/employee.entity';
import { FormField } from 'src/modules/form-field/entities/form-field.entity';
import { eDocumentStatus } from 'src/tools/enum/document-status.definition';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Document {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  status: eDocumentStatus;

  @Column({ nullable: true })
  comment: string

  @Column({ nullable: true, type: 'longblob' })
  file_stream: Buffer;

  @Column({ nullable: true })
  file_format: string;

  @Column({ nullable: true })
  employee_id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
  request_date: Date;

  @ManyToOne(() => Employee, employee => employee.id)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ nullable: false })
  form_field_id: string;

  @ManyToOne(() => FormField, formField => formField.id)
  @JoinColumn({ name: 'form_field_id' })
  formField: FormField;
}
