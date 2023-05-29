// UserService.ts
import { UserModel, User } from './User';

class UserService {
  async createUser(name: string, role: string): Promise<User> {
    const id = await this.generateUserId();
    const user = new UserModel({ id, name, role });
    return user.save();
  }

  private async generateUserId(): Promise<string> {
    const lastUser = await UserModel.findOne().sort({ id: -1 }).exec();
    const lastUserId = lastUser ? Number(lastUser.id) : 0;
    const newUserId = String(lastUserId + 1).padStart(5, '0');
    return newUserId;
  }
}

export default UserService;
