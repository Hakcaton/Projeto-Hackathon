
import { Contract } from 'src/modules/contract/entities/contract.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({unique: true})
  cpf: string;

  @Column({name: 'full_name'})
  fullName: string;

  @Column({nullable: false, default: true})
  active: boolean;

  @Column({name: 'contract_id'})
  contractId: string;

  @ManyToOne(() => Contract, contract =>  contract.id)
  @JoinColumn({name: 'contract_id'})
  contract: Contract;

}
