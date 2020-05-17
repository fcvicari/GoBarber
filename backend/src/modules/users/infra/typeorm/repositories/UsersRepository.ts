import { getRepository, Repository, Not } from 'typeorm';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IListProviderDTO from '@modules/users/dtos/IListProviderDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '../entities/User';

class UserRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ where: { email } });
  }

  public async findAll(user: IListProviderDTO): Promise<User[]> {
    let users: User[];

    if (user.except_user_id) {
      users = await this.ormRepository.find({
        where: { id: Not(user.except_user_id) },
      });
    } else {
      users = await this.ormRepository.find();
    }

    return users;
  }

  public async create(userDate: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userDate);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UserRepository;
