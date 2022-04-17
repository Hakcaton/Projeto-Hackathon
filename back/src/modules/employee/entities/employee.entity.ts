
import { Contract } from 'src/modules/contract/entities/contract.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  cpf: string;

  @Column()
  fullName: string;

  @ManyToOne(() => Contract, contract =>  contract.id)
  @JoinColumn({name: 'contract_id'})
  contract: Contract;

}
