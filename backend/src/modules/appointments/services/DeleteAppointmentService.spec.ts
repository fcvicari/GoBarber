import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import DeleteAppointmentService from './DeleteAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let fakeNotificationsRepository: FakeNotificationsRepository;
let deleteAppointmentService: DeleteAppointmentService;

describe('DeleteAppointment', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    deleteAppointmentService = new DeleteAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should not be able to delete a appointment', async () => {
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 21, 10).getTime();
    });

    const appointment = await createAppointmentService.execute({
      date: new Date(2020, 4, 21, 11),
      client_id: '9876543210',
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
