import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }

  public delete(idAppointment: string): null {
    const appointmentIndex = this.appointments.findIndex(
      findAppointment => findAppointment.id === idAppointment,
    );

    this.appointments.splice(appointmentIndex, 1);

    return null;
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointmentInDate = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    return findAppointmentInDate || null;
  }

  public findById(idAppointment: string): Appointment | null {
    const findAppointmentById = this.appointments.find(
      appointment => idAppointment === appointment.id,
    );

    return findAppointmentById || null;
  }
}

export default AppointmentsRepository;
