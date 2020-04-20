import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

class DeleteAppointmentService {
  public async execute(id: string): Promise<null> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const findAppointmentInID = await appointmentsRepository.findById(id);
    if (!findAppointmentInID) {
      throw Error('This appointment is not exists.');
    }

    await appointmentsRepository.delete(findAppointmentInID);

    return null;
  }
}

export default DeleteAppointmentService;
