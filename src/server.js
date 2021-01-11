import './lib/dotenv';
import App from './App';

const port = process.env.PORT || process.env.APP_PORT;
const URL = `${process.env.APP_URL}:${port}${process.env.SUBDIRECTORY}/api/v1`;

App.set('port', port);

App.listen(port, () => {
  console.log(`API is running on ${URL}`);
});
