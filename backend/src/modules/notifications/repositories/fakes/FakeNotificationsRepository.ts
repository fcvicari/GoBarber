import { ObjectID } from 'mongodb';
import ICreateNotificationDTO from '../../dtos/ICreateNotificationDTO';
import Notification from '../../infra/typeorm/schemas/notification';
import INotificationsRepository from '../INotificationsRepository';

class FakeNotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const nofitication = new Notification();

    Object.assign(nofitication, { id: new ObjectID(), recipient_id, content });

    this.notifications.push(nofitication);

    return nofitication;
  }
}

export default FakeNotificationsRepository;
