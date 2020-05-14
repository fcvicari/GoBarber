import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

export default class ResetPassword {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    const resetPasswordService = container.resolve(ResetPasswordService);

    const user = await resetPasswordService.execute({
      token,
      password,
    });

    return response.json(user);
  }
}
