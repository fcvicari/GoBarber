import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeServicesRepository from '../repositories/fakes/FakeServicesRepository';
import CreateServicesService from './CreateServicesService';

let fakeServicesRepository: FakeServicesRepository;
let fakeCacheProvider: FakeCacheProvider;
let fakeUserRepository: FakeUserRepository;
let createServicesService: CreateServicesService;

describe('CreateServicesProvider', () => {
  beforeEach(() => {
    fakeServicesRepository = new FakeServicesRepository();
    fakeUserRepository = new FakeUserRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createServicesService = new CreateServicesService(
      fakeServicesRepository,
      fakeUserRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new service by provider', async () => {
    const provider = await fakeUserRepository.create({
      email: 'jonhdou@jonhdou.com',
      name: 'Jonh Dou',
      password: '12345678',
    });

    const service = await createServicesService.execute({
      provider_id: provider.id,
      description: 'Barba',
      value: 15,
    });

    expect(service).toHaveProperty('id');
    expect(service.description).toBe('Barba');
  });

  it('should not be able to create a new service by provider does not exists', async () => {
    await expect(
      createServicesService.execute({
        provider_id: '123445677',
        description: 'Barba',
        value: 15,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new service by provider with the same description', async () => {
    const provider = await fakeUserRepository.create({
      email: 'jonhdou@jonhdou.com',
      name: 'Jonh Dou',
      password: '12345678',
    });

    await createServicesService.execute({
      provider_id: provider.id,
      description: 'Barba',
      value: 15,
    });

    await expect(
      createServicesService.execute({
        provider_id: provider.id,
        description: 'Barba',
        value: 15,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
