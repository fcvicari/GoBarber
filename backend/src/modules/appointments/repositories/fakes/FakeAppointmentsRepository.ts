import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointmentInDate = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointmentInDate;
  }

  public async findById(id: string): Promise<Appointment | undefined> {
    const findAppointmentById = this.appointments.find(
      appointment => appointment.id === id,
    );

    if (findAppointmentById) {
      return findAppointmentById;
    }
    return undefined;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), provider_id, date });

    this.appointments.push(appointment);

    return appointment;
  }

  public async delete(appointment: Appointment): Promise<void> {
    const findAppointmentById = this.appointments.findIndex(
      current => current.id === appointment.id,
    );

    if (findAppointmentById > -1) {
      this.appointments.splice(findAppointmentById, 1);
    }
  }
}

export default FakeAppointmentsRepository;
