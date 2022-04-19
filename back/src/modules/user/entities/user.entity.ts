
import { ePermission } from 'src/tools/data-definition/permission.definition';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column() 
  email: string;

  @Column()
  password: string;

  @Column()
  permission: ePermission;

  @Column({ default: true })
  isActive?: boolean;
}
