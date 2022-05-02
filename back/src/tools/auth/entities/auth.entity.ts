import { Entity, Column } from "typeorm";

@Entity()
export class Auth {
	@Column({ primary: true })
	user_id: string;

	@Column()
	token: string;
}
