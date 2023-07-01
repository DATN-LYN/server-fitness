import * as bcryptjs from 'bcryptjs';

export class PasswordUtil {
  static async generateHash(password: string): Promise<string> {
    return await bcryptjs.hash(password, Number(5));
  }

  static async validateHash(password: string, hash: string) {
    return await bcryptjs.compare(password, hash);
  }
}
