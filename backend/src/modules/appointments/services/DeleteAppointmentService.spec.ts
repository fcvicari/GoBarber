import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import DeleteAppointmentService from './DeleteAppointmentService';

describe('DeleteAppointment', () => {
  it('should not be able to delete a appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
    const deleteAppointmentService = new DeleteAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '0123456789',
    });

    expect(
      await deleteAppointmentService.execute(appointment.id),
    ).toBeUndefined();
  });

  it('do not should be able delete a appointment not exists', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const deleteAppointmentService = new DeleteAppointmentService(
      fakeAppointmentsRepository,
    );

    await expect(
      deleteAppointmentService.execute('1234567890'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
