import { User } from 'src/modules/user/entities/user.entity';
import { Entity, Column, OneToOne, PrimaryColumn, JoinColumn } from 'typeorm';

@Entity()
export class Company {
  @Column({ primary: true })
  cnpj: string;

  @Column({ name: 'corportate_name' })
  corporateName: string;

  @Column({ name: 'fantasy_name' })
  fantasyName: string;

  @Column({ name: 'state_registration' })
  stateRegistration: string;

  @Column({name: 'registered_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false})
  registeredDate: Date;

  @Column({ name: 'responsable_user_id' })
  responsableUserId: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'responsable_user_id' })
  responsableUser: User;
}
