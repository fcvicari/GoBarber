import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    fakeAppointmentsRepository.create({
      provider_id: 'providerOne',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    fakeAppointmentsRepository.create({
      provider_id: 'providerOne',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    fakeAppointmentsRepository.create({
      provider_id: 'providerOne',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    fakeAppointmentsRepository.create({
      provider_id: 'providerOne',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id: 'providerOne',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 11, available: false },
        { hour: 14, available: false },
        { hour: 16, available: true },
      ]),
    );
  });
});
