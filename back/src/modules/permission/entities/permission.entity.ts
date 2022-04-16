import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  role: string;

  /*@OneToMany(() => User, user => user.permission)
  users: User[];*/
}
