import { container } from 'tsyringe';

import ICacheProvider from './models/ICacheProvider';
import RedisCacheProvider from './implementations/RedisCacheProvider';

const providers = {
  Redis: RedisCacheProvider,
};

container.registerSingleton<ICacheProvider>('CacheProvider', providers.Redis);
