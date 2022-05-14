
import { Contract } from 'src/modules/contract/entities/contract.entity';
import { eDocumentRecurrence } from 'src/tools/enum/document-recurrence.definition';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class FormField {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ nullable: false })
  subtitle: string;

  @Column()
  recurrence: eDocumentRecurrence;

  @Column({ default: false })
  individual: boolean;

  @Column({ default: true })
  required: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false, name: 'first_request_date' })
  firstRequestDate: Date;

  @Column({ nullable: false, name: 'contract_id' })
  contractId: string;

  @ManyToOne(() => Contract, contract => contract.id)
  @JoinColumn({ name: 'contract_id' })
  contract: Contract
}
