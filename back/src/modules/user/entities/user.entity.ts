
import { randomUUID } from 'crypto';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column() 
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive?: boolean;

 /* @ManyToOne(() => Permission, permission => permission.users)
  permission: Permission;*/
}
