
import { Contract } from 'src/modules/contract/entities/contract.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class FormField {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column() 
  title: string;

  @Column()
  subtitle: string;

  @Column()
  recurrence: eRecurrence;

  @Column()
  individual: boolean;

  @Column()
  required: boolean;

  @ManyToOne(() => Contract, contract =>  contract.id)
  @JoinColumn({name: 'contract_id'})
  contract: Contract
}


