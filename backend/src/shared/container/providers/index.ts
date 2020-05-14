import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import IMailProvider from './EmailProvider/models/IMailProvider';
import EtherealEmailProvider from './EmailProvider/implementations/EtherealEmailProvider';

container.registerSingleton<IStorageProvider>(
  'DiskStorageProvider',
  DiskStorageProvider,
);

container.registerInstance<IMailProvider>(
  'EmailProvider',
  new EtherealEmailProvider(),
);
