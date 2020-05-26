import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProvidersAppointmentsService from './ListProvidersAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProvidersAppointmentsService: ListProvidersAppointmentsService;

describe('ListProvidersAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProvidersAppointmentsService = new ListProvidersAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the appointments on a specific provider and day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'providerOne',
      client_id: 'clientOne',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'providerOne',
      client_id: 'clientOne',
      date: new Date(2020, 4, 21, 16, 0, 0),
    });

    const appointments = await listProvidersAppointmentsService.execute({
      provider_id: 'providerOne',
      day: 21,
      month: 5,
      year: 2020,
    });

    await listProvidersAppointmentsService.execute({
      provider_id: 'providerOne',
      day: 21,
      month: 5,
      year: 2020,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
