import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ListUserDetailService from './ListUserDetailService';

let fakeUsersRepository: FakeUsersRepository;
let listUserDetailService: ListUserDetailService;

describe('ListDetailUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listUserDetailService = new ListUserDetailService(fakeUsersRepository);
  });

  it('should be able to list a detail from user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@johndoe.com',
      password: '12345678',
    });

    const userDetail = await listUserDetailService.execute({
      userId: user.id,
    });

    expect(userDetail).toHaveProperty('name');
  });

  it('should not be able to list a detail from user with id not exist', async () => {
    await expect(
      listUserDetailService.execute({ userId: '1234456' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
