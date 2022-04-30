
import { Company } from 'src/modules/company/entities/company.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Contract {
  map(arg0: (contract: any) => any): import("../dto/get-contract.dto").GetContractDto {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false, name: 'initial_date' })
  initialDate: Date;

  @Column({ type: 'timestamp', nullable: true, name: 'final_date' })
  finalDate: Date;

  @Column({ name: 'company_cnpj' })
  companyCNPJ: string;

  @ManyToOne(() => Company, company => company.cnpj)
  @JoinColumn({ name: 'company_cnpj' })
  Company: Company;
}
