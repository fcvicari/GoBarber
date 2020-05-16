import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

import IMailProvider from './EmailProvider/models/IMailProvider';
import EtherealEmailProvider from './EmailProvider/implementations/EtherealEmailProvider';

container.registerSingleton<IStorageProvider>(
  'DiskStorageProvider',
  DiskStorageProvider,
);

container.registerInstance<IMailTemplateProvider>(
  'MailTemplateProvider',
  new HandlebarsMailTemplateProvider(),
);

container.registerInstance<IMailProvider>(
  'EmailProvider',
  container.resolve(EtherealEmailProvider),
);
