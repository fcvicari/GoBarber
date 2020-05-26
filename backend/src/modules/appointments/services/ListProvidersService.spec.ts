import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProvider', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProvidersService = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'user1',
      email: 'user1@johndoe.com',
      password: '12345678',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'user2',
      email: 'user2@johndoe.com',
      password: '12345678',
    });

    const userLogged = await fakeUsersRepository.create({
      name: 'user3',
      email: 'user3@johndoe.com',
      password: '12345678',
    });

    const listProviders = await listProvidersService.execute({
      user_id: userLogged.id,
    });

    await listProvidersService.execute({
      user_id: userLogged.id,
    });

    expect(listProviders).toEqual([user1, user2]);
  });
});
