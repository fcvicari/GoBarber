import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import EnsureAuthentication from '../middlewares/EnsureAuthentication';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const userService = new CreateUserService();

    const user = await userService.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.patch(
  '/avatar',
  EnsureAuthentication,
  upload.single('avatar'),
  async (request, response) => {
    const user_id = request.user.id;
    const avatarFileName = request.file.filename;

    const useravatarservice = new UpdateUserAvatarService();

    const user = await useravatarservice.execute({ user_id, avatarFileName });

    delete user.password;

    return response.json(user);
  },
);

export default usersRouter;
