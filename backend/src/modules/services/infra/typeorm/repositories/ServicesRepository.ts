import { getRepository, Repository } from 'typeorm';
import IServicesProviderRepository from '@modules/services/repositories/IServicesRepository';
import Services from '@modules/services/infra/typeorm/entities/Services';
import ICreateServicesDTO from '@modules/services/dtos/ICreateServicesDTO';
import IFindServicesByDescriptionDTO from '@modules/services/dtos/IFindServicesByDescriptionDTO';

class ServicesProviderRepository implements IServicesProviderRepository {
  private ormRepository: Repository<Services>;

  constructor() {
    this.ormRepository = getRepository(Services);
  }

  public async create({
    provider_id,
    description,
    value,
  }: ICreateServicesDTO): Promise<Services> {
    const service = this.ormRepository.create({
      provider_id,
      description,
      value,
    });

    await this.ormRepository.save(service);

    return service;
  }

  public async delete(services: Services): Promise<void> {
    await this.ormRepository.remove(services);
  }

  public async findByDescription({
    provider_id,
    description,
  }: IFindServicesByDescriptionDTO): Promise<Services | undefined> {
    const service = await this.ormRepository.findOne({
      where: {
        provider_id,
        description,
      },
    });

    return service;
  }

  public async findByProvider(provider_id: string): Promise<Services[]> {
    const service = await this.ormRepository.find({
      where: {
        provider_id,
      },
      order: {
        description: 'ASC',
      },
      relations: ['provider'],
    });

    return service;
  }
}

export default ServicesProviderRepository;
