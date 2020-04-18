import AppointmentsRepository from '../repositories/AppointmentsRepository';

class DeleteAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  execute(id: string): null {
    const appointment = this.appointmentsRepository.findById(id);

    if (!appointment) {
      throw Error('This appointment is not exists.');
    }

    return this.appointmentsRepository.delete(id);
  }
}

export default DeleteAppointmentService;
