import { EntityRepository, Repository } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointmentInDate = await this.findOne({
      where: { date },
    });

    return findAppointmentInDate || null;
  }

  public async findById(id: string): Promise<Appointment | null> {
    const findAppointmentById = await this.findOne({
      where: { id },
    });

    return findAppointmentById || null;
  }
}

export default AppointmentsRepository;
