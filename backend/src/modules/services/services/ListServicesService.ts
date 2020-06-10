import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IServicesRepository from '../repositories/IServicesRepository';
import Services from '../infra/typeorm/entities/Services';

interface IRequest {
  provider_id: string;
}

@injectable()
class ListServicesService {
  constructor(
    @inject('ServicesRepository')
    private servicesRepository: IServicesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ provider_id }: IRequest): Promise<Services[]> {
    let services = await this.cacheProvider.recover<Services[]>(
      `provider-services:${provider_id}`,
    );

    if (!services) {
      services = await this.servicesRepository.findByProvider(provider_id);

      await this.cacheProvider.save(
        `provider-services:${provider_id}`,
        services,
      );
    }

    return services;
  }
}

export default ListServicesService;
