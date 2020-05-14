import AppError from '@shared/errors/AppError';

import FakeEmailProvider from '@shared/container/providers/EmailProvider/fakes/FakeEmailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeEmailProvider: FakeEmailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeEmailProvider = new FakeEmailProvider();
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeEmailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeEmailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'johndoe@johndoe.com',
      password: '12345678',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'johndoe@johndoe.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover the password not using the email to existing user', async () => {
    await expect(
      sendForgotPasswordEmailService.execute({
        email: 'johndoe@johndoe.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const userTokensRepository = jest.spyOn(
      fakeUserTokensRepository,
      'generate',
    );

    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'johndoe@johndoe.com',
      password: '12345678',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'johndoe@johndoe.com',
    });

    expect(userTokensRepository).toHaveBeenCalledWith(user.id);
  });
});
