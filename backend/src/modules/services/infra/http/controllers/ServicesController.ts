import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateServicesService from '@modules/services/services/CreateServicesService';
import ListServicesService from '@modules/services/services/ListServicesService';

export default class ServicesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { description, value } = request.body;

    const createServices = container.resolve(CreateServicesService);

    const service = await createServices.execute({
      provider_id,
      description,
      value,
    });

    return response.json(service);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;

    const listServices = container.resolve(ListServicesService);

    const services = await listServices.execute({
      provider_id,
    });

    return response.json(classToClass(services));
  }
}
