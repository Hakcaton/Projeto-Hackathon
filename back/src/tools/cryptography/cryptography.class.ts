import * as bcrypt from 'bcrypt';

export class Cryptography {
    static async encrypt(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        return hash
    }
    
    static async compare(hash: string, password: string): Promise<boolean> {
        const isMatch = await bcrypt.compare(hash, password);
        return isMatch;
    }
}