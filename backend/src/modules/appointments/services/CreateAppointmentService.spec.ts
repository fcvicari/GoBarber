import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '0123456789',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('0123456789');
  });

  it('should not be able to create two appointment on the same time', async () => {
    const appointmentDate = new Date();

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '0123456789',
    });

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '0123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
