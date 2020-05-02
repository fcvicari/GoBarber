import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import DeleteAppointmentService from '../services/DeleteAppointmentService';
import EnsureAuthentication from '../middlewares/EnsureAuthentication';

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