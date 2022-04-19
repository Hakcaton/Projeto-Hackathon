
import { Employee } from 'src/modules/employee/entities/employee.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class EmployeeMovement {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: 'timestamp', nullable: false })
  join: Date;

  @Column({ type: 'timestamp', nullable: true })
  leave: Date;

  @Column({ type: "uuid", length: 36, nullable: false})
  employee_id: string;

  @ManyToOne(() => Employee, employee => employee.id)
  @JoinColumn({ name: 'employee_id' })
  contract: Employee;
}
