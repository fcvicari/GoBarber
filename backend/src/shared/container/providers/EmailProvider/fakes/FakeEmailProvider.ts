import IMailProvider from '../models/IMailProvider';

interface IMail {
  email: string;
  body: string;
}

class FakeEmailProvider implements IMailProvider {
  private emails: IMail[] = [];

  public async sendMail(email: string, body: string): Promise<void> {
    this.emails.push({ email, body });
  }
}

export default FakeEmailProvider;
