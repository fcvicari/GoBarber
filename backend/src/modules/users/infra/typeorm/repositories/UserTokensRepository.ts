import { getRepository, Repository } from 'typeorm';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserToken from '../entities/UserToken';

class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async generate(user_id: string): Promise<UserToken> {
    const usertToken = this.ormRepository.create({ user_id });

    await this.ormRepository.save(usertToken);

    return usertToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const usertToken = await this.ormRepository.findOne({
      where: { id: token },
    });

    return usertToken;
  }
}

export default UserTokensRepository;
