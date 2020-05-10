import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

class DeleteAppointmentService {
  public async execute(id: string): Promise<null> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const findAppointmentInID = await appointmentsRepository.findById(id);
    if (!findAppointmentInID) {
      throw new AppError('This appointment is not exists.', 400);
    }

    await appointmentsRepository.delete(findAppointmentInID);

    return null;
  }
}

export default DeleteAppointmentService;
