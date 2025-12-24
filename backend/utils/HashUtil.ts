import bcrypt from 'bcrypt';

export class HashUtil {
    private readonly saltRounds: number = 10;

    /**
     * Hash a password using bcrypt
     */
    public async hash(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    /**
     * Compare a plain text password with a hashed password
     */
    public async compare(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
}
