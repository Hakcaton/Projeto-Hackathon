
import { User } from 'src/modules/user/entities/user.entity';
import { Entity, Column, OneToOne, PrimaryColumn, JoinColumn } from 'typeorm';

@Entity()
export class Company {
  @PrimaryColumn()
  cnpj: string;

  @Column({ name: 'corportate_name' })
  comporateName: string;

  @Column({ name: 'fantasy_name' })
  fantasyName: string;

  @Column({ name: 'state_registration' })
  stateRegistration: string;

  @Column({ name: 'responsable_user_id' })
  responsableUserId: string;

  @OneToOne(() => User, user => user.id)
  @JoinColumn({ name: 'responsable_user_id' })
  responsableUser: User;
}
