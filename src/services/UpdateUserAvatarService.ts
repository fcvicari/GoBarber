import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/User';
import ConfigUpload from '../config/upload';

interface RequestDTO {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: RequestDTO): Promise<User> {
    const updateavataruser = getRepository(User);

    const user = await updateavataruser.findOne(user_id);
    if (!user) {
      throw new Error('Authenticated user not exists.');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(
        ConfigUpload.file_destination,
        user.avatar,
      );
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;
    await updateavataruser.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
