import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/Fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import AuthUserService from './AuthUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createAppointmentService: CreateUserService;
let authUserService: AuthUserService;

describe('AuthUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createAppointmentService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    authUserService = new AuthUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate a user', async () => {
    const user = await createAppointmentService.execute({
      name: 'Jonh Doe',
      email: 'jonhdoe@johndoe.com',
      password: '12345678',
    });

    const response = await authUserService.execute({
      email: 'jonhdoe@johndoe.com',
      password: '12345678',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should be able to authenticate with non existing user', async () => {
    await expect(
      authUserService.execute({
        email: 'jonhdoe@johndoe.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate a user with wrong password', async () => {
    await createAppointmentService.execute({
      name: 'Jonh Doe',
      email: 'jonhdoe@johndoe.com',
      password: '12345678',
    });

    await expect(
      authUserService.execute({
        email: 'jonhdoe@johndoe.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
