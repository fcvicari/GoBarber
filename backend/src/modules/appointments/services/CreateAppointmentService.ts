import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
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

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
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
      provider_id,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked.', 400);
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      client_id,
      date: dateStartOfHour,
    });

    await this.cacheProvider.invalidate(
      `provider-appointments:${provider_id}:${format(date, 'yyyy-M-d')}`,
    );

    const dateFormatted = format(dateStartOfHour, "dd/MM/yyyy 'às' HH:mm'h'");

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Você possui um novo agendamento para o dia ${dateFormatted}`,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
