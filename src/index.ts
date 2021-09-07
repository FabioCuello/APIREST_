import { createApp } from './app';
import { APP_HOSTNAME, APP_PORT, APP_PROTOCOL } from './config';
import { createConnection } from 'typeorm';

(async () => {
  const app = createApp();
  let retries = 10;
  while (retries) {
    try {
      await createConnection();
      app.listen(APP_PORT, () =>
        console.log(`${APP_PROTOCOL}://${APP_HOSTNAME}:${APP_PORT}`)
      );
      break;
    } catch (error) {
      console.log(error);
      retries -= 1;
      console.log(`retries left: ${retries}`);
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
})();
