import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UsersContoller {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const avatarFileName = request.file.filename;

    const userAvatarService = container.resolve(UpdateUserAvatarService);

    const user = await userAvatarService.execute({ user_id, avatarFileName });

    return response.json(classToClass(user));
  }
}
