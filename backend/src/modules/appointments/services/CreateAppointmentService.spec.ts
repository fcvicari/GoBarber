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
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 21, 10).getTime();
    });

    const appointment = await createAppointmentService.execute({
      date: new Date(2020, 4, 21, 11),
      client_id: '987654321',
      provider_id: '0123456789',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('0123456789');
    expect(appointment.client_id).toBe('987654321');
  });

  it('should not be able to create two appointment on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 21, 11);

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 21, 10).getTime();
    });

    await createAppointmentService.execute({
      date: appointmentDate,
      client_id: '987654321',
      provider_id: '0123456789',
    });

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        client_id: '987654321',
        provider_id: '0123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create the appointment to provider equals the client', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 21, 10).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 21, 11),
        client_id: '0123456789',
        provider_id: '0123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create the appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 21, 11).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 21, 10),
        client_id: '9876543210',
        provider_id: '0123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create the appointment before 7am or after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 21, 11).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 22, 7),
        client_id: '9876543210',
        provider_id: '0123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 22, 18),
        client_id: '9876543210',
        provider_id: '0123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
