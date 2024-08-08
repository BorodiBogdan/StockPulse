import { promisify } from 'util';
import crypto from 'crypto';

const pbkdf2 = promisify(crypto.pbkdf2);

const iterations = 100000;
const keyLength = 64;
const digest = 'sha512';

export async function hashPassword(password: string): Promise<string> {
    const derivedKey = await pbkdf2(password, '', iterations, keyLength, digest);
    return derivedKey.toString('hex');
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    const derivedKey = await pbkdf2(password, '', iterations, keyLength, digest);
    return hash === derivedKey.toString('hex');
}