import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

interface IMail {
  email: string;
  body: string;
}

class FakeEmailProvider implements IMailProvider {
  private emails: ISendMailDTO[] = [];

  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.emails.push(message);
  }
}

export default FakeEmailProvider;
