import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

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
  celebrate({
    [Segments.PARAMS]: { provider_id: Joi.string().uuid().required() },
  }),
  providerDayAvailabilityController.index,
);

listProviders.get(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.PARAMS]: { provider_id: Joi.string().uuid().required() },
  }),
  providerMonthAvailabilityController.index,
);

export default listProviders;
