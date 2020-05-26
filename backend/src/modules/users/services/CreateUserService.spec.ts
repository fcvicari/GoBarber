import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/Fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createAppointmentService: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createAppointmentService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createAppointmentService.execute({
      name: 'Jonh Doe',
      email: 'jonhdoe@johndoe.com',
      password: '12345678',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with email exists anouther user', async () => {
    await createAppointmentService.execute({
      name: 'Jonh Doe',
      email: 'jonhdoe@johndoe.com',
      password: '12345678',
    });

    await expect(
      createAppointmentService.execute({
        name: 'Jonh Doe',
        email: 'jonhdoe@johndoe.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
