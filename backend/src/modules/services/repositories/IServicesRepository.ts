import Services from '../infra/typeorm/entities/Services';
import ICreateServicesDTO from '../dtos/ICreateServicesDTO';
import IFindServicesByDescriptionDTO from '../dtos/IFindServicesByDescriptionDTO';

export default interface IServicesRepository {
  create(data: ICreateServicesDTO): Promise<Services>;
  delete(service: Services): Promise<void>;

  findByDescription(
    data: IFindServicesByDescriptionDTO,
  ): Promise<Services | undefined>;

  findByProvider(provider_id: string): Promise<Services[]>;
}
