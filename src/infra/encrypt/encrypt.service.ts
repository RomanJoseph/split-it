import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptService {
    private readonly SALT: number;

    constructor() {
        this.SALT = 10;
    }

    async encryptPassword(password: string) {
        try {
            const hash = await bcrypt.hash(password, this.SALT);
            return hash;
        } catch(err) {
            throw new Error(err);
        }
    }

    async comparePassword(password: string, hash: string) {
        const match = await bcrypt.compare(password, hash);
        return { match };
    }
}