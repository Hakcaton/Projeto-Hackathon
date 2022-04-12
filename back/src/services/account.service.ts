import { Injectable } from '@nestjs/common';
import { db } from 'src/main';

@Injectable()
export class AccountService {
    async getProfileById(userId: string): Promise<any | null> {
        let qry = `
                SELECT user.*, person.* FROM user
                LEFT JOIN person ON(user.id = person.id)
                WHERE user.id = ?
                LIMIT 1
                `;
        let params = [userId];
        let user = await db.getAll(qry, params);

        if (user.length > 0) {
            return user[0];
        }

        return null;
    }
}
