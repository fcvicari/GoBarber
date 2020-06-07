import { injectable, inject } from 'tsyringe';
import { format } from 'date-fns';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

@injectable()
class DeleteAppointmentService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(provider_id: string, id: string): Promise<void> {
    const findAppointmentInID = await this.appointmentsRepository.findById(id);
    if (!findAppointmentInID) {
      throw new AppError('This appointment is not exists.', 400);
    }

    if (provider_id !== findAppointmentInID.provider_id) {
      throw new AppError(
        'This appointment does not belong to provider logged.',
        400,
      );
    }

    await this.appointmentsRepository.delete(findAppointmentInID);

    await this.cacheProvider.invalidate(
      `provider-appointments:${provider_id}:${format(
        findAppointmentInID.date,
        'yyyy-M-d',
      )}`,
    );

    return undefined;
  }
}

export default DeleteAppointmentService;
