import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/EnsureAuthentication';
import ProvidersController from '../controllers/ProvidersController';

const listProviders = Router();
const providersController = new ProvidersController();

listProviders.use(ensureAuthenticated);

listProviders.get('/', providersController.index);

export default listProviders;
