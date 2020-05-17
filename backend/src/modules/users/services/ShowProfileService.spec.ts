import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@jonhdoe.com',
      password: '123456',
    });

    const showProfile = await showProfileService.execute({ user_id: user.id });

    expect(showProfile.name).toBe('Jonh Doe');
    expect(showProfile.email).toBe('jonhdoe@jonhdoe.com');
  });

  it('should not be able to update user not exists', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'user.id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
