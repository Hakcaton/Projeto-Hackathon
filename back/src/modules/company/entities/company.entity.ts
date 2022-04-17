
import { User } from 'src/modules/user/entities/user.entity';
import { Entity, Column, OneToOne, PrimaryColumn, JoinColumn } from 'typeorm';

@Entity()
export class Company {
  @PrimaryColumn()
  cnpj: string;

  @Column()
  comporate_name: string;

  @Column()
  fantasy_name: string;

  @Column()
  state_registration: string;

  @OneToOne(() => User, user => user.id)
  @JoinColumn({name: 'responsable_user_id'})
  user: User;
}
