import { Injectable } from '@nestjs/common';
import { db } from 'src/main';

@Injectable()
export class UserService {
    async getUserById(userId: string): Promise<any | null> {
        let qry = 'SELECT * FROM user WHERE user.id = ? LIMIT 1';
        let params = [userId];
        let user = await db.getAll(qry, params);

        if (user.length > 0) {
            return user[0];
        }

        return null;
    }

    async getUserByEmail(email: string): Promise<any | null> {
        let qry = 'SELECT * FROM user WHERE user.email = ? LIMIT 1';
        let params = [email];
        let user = await db.getAll(qry, params);

        if (user.length > 0) {
            return user[0];
        }

        return null;
    }

    async getPermission(userId: number): Promise<number | null> {
        let qry = 'SELECT user.permission FROM user WHERE user.id = ? LIMIT 1';
        let params = [userId];
        let userPermission = await db.getAll(qry, params);

        if (userPermission.length > 0) {
            return userPermission[0].permission;
        }

        return null;
    }

    async getIdByEmail(email: string): Promise<number | null> {
        let qry = 'SELECT user.id FROM user WHERE user.email = ? LIMIT 1';
        let params = [email];
        let userId = await db.getAll(qry, params);

        if (userId.length > 0) {
            return userId[0].id;
        }

        return null;
    }
}
