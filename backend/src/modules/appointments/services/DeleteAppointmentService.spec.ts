import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import DeleteAppointmentService from './DeleteAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let deleteAppointmentService: DeleteAppointmentService;

describe('DeleteAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    deleteAppointmentService = new DeleteAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should not be able to delete a appointment', async () => {
    const createAppointmentService = new CreateAppointmentService(
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
    await expect(
      deleteAppointmentService.execute('1234567890'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
