import { User } from '@/db/entities/User';

export class UserCommand {
  static async findByEmail(email: string): Promise<User> {
    return await User.findOne({ where: { email }, relations: ['role'] });
  }
}
