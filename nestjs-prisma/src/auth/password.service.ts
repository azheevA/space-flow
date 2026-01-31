import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class PasswordService {
  async getHash(password: string): Promise<string> {
    return await argon2.hash(password);
  }

  async compare(hash: string, plain: string): Promise<boolean> {
    try {
      return await argon2.verify(hash, plain);
    } catch (e) {
      return false;
      console.error('Error comparing password hash:', e);
    }
  }
}
