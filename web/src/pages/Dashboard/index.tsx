import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { isToday, format, isAfter, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { FiPower, FiClock } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schadule,
  Calendar,
  Section,
  Appointment,
  NextAppointment,
} from './styles';
import { useAuth } from '../../hooks/Auth';
import api from '../../services/api';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface AppointmentItem {
  id: string;
  date: string;
  hourFormatted: string;
  client: {
    id: string;
    name: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const { singOut, user } = useAuth();

  const [selectDate, setSelectDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);

  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then((response) => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    api
      .get<AppointmentItem[]>('/appointments/me', {
        params: {
          year: selectDate.getFullYear(),
          month: selectDate.getMonth() + 1,
          day: selectDate.getDate(),
        },
      })
      .then((response) => {
        const appointmentsFormatted = response.data.map((appointment) => {
          return {
            ...appointment,
            hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
          };
        });
        setAppointments(appointmentsFormatted);
      });
  }, [selectDate]);

  function ShowUserImage(user_image: string, user_name: string): any {
    if (user_image) {
      return <img src={user_image} alt={user_name} />;
    }
    return <img src={logoImg} alt="No avatar" />;
  }

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter((monthDay) => monthDay.available === false)
      .map((monthDay) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        const date = new Date(year, month, monthDay.day);

        return date;
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectDate(day);
    }
  }, []);

  const selectDayAsText = useMemo(() => {
    return format(selectDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  }, [selectDate]);

  const selectWeekDay = useMemo(() => {
    return format(selectDate, 'cccc', { locale: ptBR });
  }, [selectDate]);

  const nextAppointment = useMemo(() => {
    return appointments.find((appointment) =>
      isAfter(parseISO(appointment.date), new Date()),
    );
  }, [appointments]);

  const morningAppointments = useMemo(() => {
    return appointments.filter(
      (appointment) => parseISO(appointment.date).getHours() < 12,
    );
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments.filter(
      (appointment) => parseISO(appointment.date).getHours() >= 12,
    );
  }, [appointments]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />
          <Profile>
            {ShowUserImage(user.avatar_url, user.name)}

            <div>
              <span>Bem-vindo(a),</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
          <button type="button" onClick={singOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schadule>
          <h1>Horários agendados</h1>
          <p>
            {isToday(selectDate) && <span>Hoje</span>}
            <span>{selectDayAsText}</span>
            <span>{selectWeekDay}</span>
          </p>

          {isToday(selectDate) && nextAppointment && (
            <NextAppointment>
              <strong>Próximo atendimento</strong>
              <div>
                {ShowUserImage(
                  nextAppointment.client.avatar_url,
                  nextAppointment.client.name,
                )}

                <strong>{nextAppointment.client.name}</strong>
                <span>
                  <FiClock />
                  {nextAppointment.hourFormatted}
                </span>
              </div>
            </NextAppointment>
          )}

          <Section>
            <strong>Manhã</strong>
            {morningAppointments.length === 0 && (
              <p>Nenhum agendamento para o período.</p>
            )}

            {morningAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>

                <div>
                  {ShowUserImage(
                    appointment.client.avatar_url,
                    appointment.client.name,
                  )}

                  <strong>Fernando Cezar Vicari</strong>
                </div>
              </Appointment>
            ))}
          </Section>

          <Section>
            <strong>Tarde</strong>

            {afternoonAppointments.length === 0 && (
              <p>Nenhum agendamento para o período.</p>
            )}

            {afternoonAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>

                <div>
                  {ShowUserImage(
                    appointment.client.avatar_url,
                    appointment.client.name,
                  )}

                  <strong>Fernando Cezar Vicari</strong>
                </div>
              </Appointment>
            ))}
          </Section>
        </Schadule>
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
            disabledDays={[{ daysOfWeek: [0] }, ...disabledDays]}
            fromMonth={new Date()}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5, 6] },
            }}
            onDayClick={handleDateChange}
            onMonthChange={handleMonthChange}
            selectedDays={selectDate}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
