import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

@injectable()
class DeleteAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const findAppointmentInID = await this.appointmentsRepository.findById(id);
    if (!findAppointmentInID) {
      throw new AppError('This appointment is not exists.', 400);
    }

    await this.appointmentsRepository.delete(findAppointmentInID);

    return undefined;
  }
}

export default DeleteAppointmentService;
