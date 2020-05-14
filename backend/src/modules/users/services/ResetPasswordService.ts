import { injectable, inject } from 'tsyringe';
import { differenceInHours } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/Models/IHashProvider';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);
    if (!userToken) {
      throw new AppError('User token does not exists.');
    }

    const user = await this.usersRepository.findById(userToken.user_id);
    if (!user) {
      throw new AppError('User does not exists.');
    }

    if (differenceInHours(userToken.created_at, Date.now())) {
      throw new AppError('Token expired.');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordEmailService;
