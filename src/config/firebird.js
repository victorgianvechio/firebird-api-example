import { decrypt } from '../lib/crypto';

const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_FILE,
  user: decrypt(process.env.DB_USER, process.env.CRYPTO_KEY),
  password: decrypt(process.env.DB_PASS, process.env.CRYPTO_KEY),
  lowercase_keys: false,
  role: null,
  pageSize: 4096,
};
export default options;
