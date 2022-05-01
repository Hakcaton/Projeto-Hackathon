
import { ePermission } from 'src/tools/enum/permission.definition';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({unique: true}) 
  email: string;

  @Column() 
  name: string;

  @Column() 
  lastName: string;


  @Column({nullable: true}) 
  phoneNumber?: string;

  @Column()
  password: string;

  @Column()
  permission: ePermission;

  @Column()
  cpf: string;

  @Column({ default: true })
  isActive?: boolean;
}
