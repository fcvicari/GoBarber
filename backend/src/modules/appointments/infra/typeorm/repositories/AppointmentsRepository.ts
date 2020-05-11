import { getRepository, Repository } from 'typeorm';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>

  constructor () {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointmentInDate = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointmentInDate;
  }

  public async findById(id: string): Promise<Appointment | undefined>{
    const findAppointmentById = await this.ormRepository.findOne({
      where: { id },
    });

    return findAppointmentById;
  }

  public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({provider_id, date});

    this.ormRepository.save(appointment);

    return appointment;
  }

  public async delete(appointment: Appointment): Promise<void> {
    await this.ormRepository.delete(appointment);
  }
}

export default AppointmentsRepository;
