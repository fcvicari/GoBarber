import { uuid } from 'uuidv4';
import IServicesRepository from '../IServicesRepository';
import Services from '../../infra/typeorm/entities/Services';
import ICreateServicesProviderDTO from '../../dtos/ICreateServicesDTO';
import IFindServicesByDescriptionDTO from '../../dtos/IFindServicesByDescriptionDTO';

class FakeServicesRepository implements IServicesRepository {
  private services: Services[] = [];

  public async create({
    provider_id,
    description,
    value,
  }: ICreateServicesProviderDTO): Promise<Services> {
    const service = new Services();

    Object.assign(service, { id: uuid(), provider_id, description, value });

    this.services.push(service);

    return service;
  }

  public async delete(service: Services): Promise<void> {
    const findServiceById = this.services.findIndex(
      current => current.id === service.id,
    );

    if (findServiceById > -1) {
      this.services.splice(findServiceById, 1);
    }
  }

  public async findByDescription({
    provider_id,
    description,
  }: IFindServicesByDescriptionDTO): Promise<Services | undefined> {
    const findService = this.services.find(
      service =>
        service.provider_id === provider_id &&
        service.description === description,
    );

    return findService;
  }

  public async findByProvider(provider_id: string): Promise<Services[]> {
    const services = this.services.filter(
      service => service.provider_id === provider_id,
    );

    return services;
  }
}

export default FakeServicesRepository;
