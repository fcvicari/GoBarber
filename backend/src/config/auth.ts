export default {
  jwt: {
    secret: process.env.APP_SECRET || 'joedoe',
    expiresIn: '1d',
  },
};
