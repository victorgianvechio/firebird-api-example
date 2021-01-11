import '../lib/dotenv';

import db from '../database/FirebirdConnection';

(async () => {
  await db.testConnection();
})();
