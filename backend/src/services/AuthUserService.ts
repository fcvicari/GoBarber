import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface RequestDTO {
  email: string;
  password: string;
}

interface ResponseDTO {
  user: User;
  token: string;
}

class AuthUserService {
  MessageErrorValidation = 'Invalid E-Mail or password.';

  public async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new AppError(this.MessageErrorValidation, 401);
    }

    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) {
      throw new AppError(this.MessageErrorValidation, 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ name: user.name }, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthUserService;
