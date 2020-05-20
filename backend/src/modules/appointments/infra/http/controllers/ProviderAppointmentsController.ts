import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersAppointmentsService from '@modules/appointments/services/ListProvidersAppointmentsService';

export default class ProviderAppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.body;

    const listProvidersAppointmentsService = container.resolve(
      ListProvidersAppointmentsService,
    );

    const appointments = await listProvidersAppointmentsService.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(appointments);
  }
}
