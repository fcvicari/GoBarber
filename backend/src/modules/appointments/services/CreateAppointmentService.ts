import { startOfHour, isBefore, getHours } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  client_id: string;
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    client_id,
    provider_id,
    date,
  }: IRequest): Promise<Appointment> {
    const dateStartOfHour = startOfHour(date);

    if (isBefore(dateStartOfHour, Date.now())) {
      throw new AppError(
        'You can´t create the appointment on a past date.',
        400,
      );
    }

    if (client_id === provider_id) {
      throw new AppError('You can´t create the appointment for yourself.', 400);
    }

    if (getHours(dateStartOfHour) < 8 || getHours(dateStartOfHour) > 17) {
      throw new AppError(
        'You can only create the appointment between 8am and 5pm.',
        400,
      );
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      dateStartOfHour,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked.', 400);
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      client_id,
      date: dateStartOfHour,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
