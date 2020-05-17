import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';

import EnsureAuthentication from '../middlewares/EnsureAuthentication';

const profileRoutes = Router();
const profileController = new ProfileController();

profileRoutes.use(EnsureAuthentication);

profileRoutes.get('/', profileController.show);
profileRoutes.put('/', profileController.update);

export default profileRoutes;
