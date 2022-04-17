
import { Company } from 'src/modules/company/entities/company.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Contract {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  decription: string;

  @ManyToOne(() => Company, company => company.cnpj)
  @JoinColumn({name: 'company_cnpj'})
  Company: Company;
}
