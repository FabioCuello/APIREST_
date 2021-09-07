export const {
  NODE_ENV = 'dev',
  APP_PORT = 3000,
  APP_HOSTNAME = 'localhost',
  APP_PROTOCOL = 'http',
  APP_SECRET = 'testbackend',
  APP_SALT = 1,
} = process.env;

export const APP_ORIGIN = `${APP_PROTOCOL}://${APP_HOSTNAME}:${APP_PORT}`;

export const IN_PROD = NODE_ENV === 'production';
