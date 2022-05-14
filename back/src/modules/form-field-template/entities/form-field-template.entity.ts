
import { eDocumentRecurrence } from 'src/tools/enum/document-recurrence.definition';
import { eFormFieldSubtitle } from 'src/tools/enum/form-field-subtitle.definition';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FormFieldTemplate {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false, default: eFormFieldSubtitle.requestDate })
  subtitle: eFormFieldSubtitle;

  @Column({ nullable: false, default: '' })
  description: string;

  @Column({ nullable: false })
  recurrence: eDocumentRecurrence;

  @Column({ default: false })
  individual: boolean;

  @Column({ default: true })
  required: boolean;

  @Column({ default: false })
  customizable: boolean;
}
