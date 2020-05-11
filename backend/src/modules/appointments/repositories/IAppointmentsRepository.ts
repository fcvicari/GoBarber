import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  delete(appointment: Appointment): Promise<void>;

  findByDate(date: Date): Promise<Appointment | undefined>;
  findById(id: string): Promise<Appointment | undefined>;
}
