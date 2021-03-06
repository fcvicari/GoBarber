import { Router } from 'express';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import listProviders from '@modules/appointments/infra/http/routes/listProviders.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import servicesRouter from '@modules/services/infra/http/routes/Services.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/providers', listProviders);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/services', servicesRouter);

export default routes;
