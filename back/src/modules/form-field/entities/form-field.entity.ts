
import { Contract } from 'src/modules/contract/entities/contract.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { eRecurrence } from '../dto/enum.eRecurrence';

@Entity()
export class FormField {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({nullable: true})
  subtitle: string;

  @Column()
  recurrence: eRecurrence;

  @Column()
  individual: boolean;

  @Column()
  required: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
  first_request_date: Date;

  @Column({ nullable: false })
  contract_id: string;

  @ManyToOne(() => Contract, contract => contract.id)
  @JoinColumn({ name: 'contract_id' })
  contract: Contract
}


