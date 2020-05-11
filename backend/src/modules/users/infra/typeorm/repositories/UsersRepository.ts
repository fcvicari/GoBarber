import { getRepository, Repository } from 'typeorm';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '../entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository'

class UserRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor () {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined>{
    return await this.ormRepository.findOne( id );
  }

  public async findByEmail( email: string): Promise<User | undefined>{
    return await this.ormRepository.findOne( { where: { email }, } );
  }

  public async create(userDate: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userDate);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return await this.ormRepository.save(user);
  }
}

export default UserRepository;
