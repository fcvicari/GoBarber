import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/EnsureAuthentication';
import ProvidersController from '../controllers/ProvidersController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

const listProviders = Router();
const providersController = new ProvidersController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();

listProviders.use(ensureAuthenticated);

listProviders.get('/', providersController.index);

listProviders.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index,
);

listProviders.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index,
);

export default listProviders;
