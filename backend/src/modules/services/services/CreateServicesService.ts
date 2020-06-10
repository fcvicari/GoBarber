import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IServicesRepository from '../repositories/IServicesRepository';
import Services from '../infra/typeorm/entities/Services';

interface IRequest {
  provider_id: string;
  description: string;
  value: number;
}

@injectable()
class CreateServicesService {
  constructor(
    @inject('ServicesRepository')
    private servicesRepository: IServicesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    description,
    value,
  }: IRequest): Promise<Services> {
    const provider = await this.usersRepository.findById(provider_id);

    if (!provider) {
      throw new AppError('Provider does not exists.');
    }

    const existsService = await this.servicesRepository.findByDescription({
      provider_id,
      description,
    });

    if (existsService) {
      throw new AppError('Service already registered for this provider.');
    }

    const service = await this.servicesRepository.create({
      provider_id,
      description,
      value,
    });

    await this.cacheProvider.invalidate(`provider-services:${provider_id}`);

    return service;
  }
}

export default CreateServicesService;
