interface IMailConfig {
  driver: 'ethereal';
}

export default {
  driver: process.env.MAIL_PROVIDER || 'ethereal',
} as IMailConfig;
