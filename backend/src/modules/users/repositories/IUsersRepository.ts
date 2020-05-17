import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IListProviderDTO from '../dtos/IListProviderDTO';

export default interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;

  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  findAll(user: IListProviderDTO): Promise<User[]>;
}
