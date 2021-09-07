import { User } from '../entities/users';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findByEmail(email: string) {
    return this.findOne({ email });
  }
  findByToken(token: string) {
    return this.findOne({ token });
  }
}
