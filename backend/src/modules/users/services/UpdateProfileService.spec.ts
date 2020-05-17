import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/Fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@jonhdoe.com',
      password: '123456',
    });

    const updateUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Jonh DoeDoe',
      email: 'jonhdoedoe@jonhdoedoe.com',
    });

    expect(updateUser.name).toBe('Jonh DoeDoe');
    expect(updateUser.email).toBe('jonhdoedoe@jonhdoedoe.com');
  });

  it('should not be able to update user not exists', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'user.id',
        name: 'Jonh DoeDoe',
        email: 'jonhdoedoe@jonhdoedoe.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change the e-mail another user', async () => {
    await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@jonhdoe.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@test.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Test',
        email: 'jonhdoe@jonhdoe.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@jonhdoe.com',
      password: '123456',
    });

    const updateUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Jonh DoeDoe',
      email: 'jonhdoedoe@jonhdoedoe.com',
      old_password: '123456',
      password: '654321',
    });

    expect(updateUser.password).toBe('654321');
  });

  it('should not be able to update the password because not informed old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@jonhdoe.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Jonh DoeDoe',
        email: 'jonhdoedoe@jonhdoedoe.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password because not informed correct old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@jonhdoe.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Jonh DoeDoe',
        email: 'jonhdoedoe@jonhdoedoe.com',
        old_password: '852369',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
