import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/EnsureAuthentication';
import ServicesController from '../controllers/ServicesController';

const servicesRouter = Router();
const serviceController = new ServicesController();

servicesRouter.use(ensureAuthenticated);

servicesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      value: Joi.number().required(),
    },
  }),
  serviceController.create,
);

servicesRouter.get('/', serviceController.index);

export default servicesRouter;
