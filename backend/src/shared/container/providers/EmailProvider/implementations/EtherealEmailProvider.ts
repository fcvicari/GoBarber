import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '../models/IMailProvider';

class EtherealEmailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transport = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transport;
    });
  }

  public async sendMail(email: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      from: 'Vicari GoBarber <vicari@gobarber.com>',
      to: email,
      subject: 'Nodemailer is unicode friendly ✔',
      text: body,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export default EtherealEmailProvider;
