import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeServicesRepository from '../repositories/fakes/FakeServicesRepository';
import ListServicesService from './ListServicesService';

let fakeServicesRepository: FakeServicesRepository;
let fakeCacheProvider: FakeCacheProvider;
let listServicesService: ListServicesService;

describe('ListServicesProvider', () => {
  beforeEach(() => {
    fakeServicesRepository = new FakeServicesRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listServicesService = new ListServicesService(
      fakeServicesRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new service by provider', async () => {
    await fakeServicesRepository.create({
      provider_id: '12345679',
      description: 'Barba',
      value: 15,
    });

    await fakeServicesRepository.create({
      provider_id: '12345678',
      description: 'Barba',
      value: 15,
    });

    await fakeServicesRepository.create({
      provider_id: '12345678',
      description: 'Barba 2',
      value: 15,
    });

    const services_1 = await listServicesService.execute({
      provider_id: '12345678',
    });

    const services = await listServicesService.execute({
      provider_id: '12345678',
    });

    expect(services).toHaveLength(2);
  });
});
