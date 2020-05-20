import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/EnsureAuthentication';
import AppointmentsController from '../controllers/AppointmentsContoller';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/me', providerAppointmentsController.create);

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
