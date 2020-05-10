import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import DeleteAppointmentService from '@modules/appointments/services/DeleteAppointmentService';
import EnsureAuthentication from '@modules/users/infra/http/middlewares/EnsureAuthentication';

const appointmentsRouter = Router();
appointmentsRouter.use(EnsureAuthentication);

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appointment);
});

appointmentsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const deleteAppointment = new DeleteAppointmentService();

  await deleteAppointment.execute(id);

  return response.json();
});

export default appointmentsRouter;
