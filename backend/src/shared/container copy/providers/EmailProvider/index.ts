import { container } from 'tsyringe';

import MailConfig from '@config/mail';

import IMailProvider from './models/IMailProvider';
import EtherealEmailProvider from './implementations/EtherealEmailProvider';

const providers = {
  ethereal: EtherealEmailProvider,
};

container.registerSingleton<IMailProvider>(
  'MailProvider',
  providers[MailConfig.driver],
);
