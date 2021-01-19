import '../lib/dotenv';
import chalk from 'chalk';
import { generateKey, encrypt } from '../lib/crypto';

function cryptoConnection() {
  if (process.argv[2] === undefined || process.argv[3] === undefined) {
    console.log(chalk.hex('#f00').bold('\nInvalid arguments [user pass]\n'));
    return;
  }

  const secretKey = generateKey();
  const user = encrypt(process.argv[2], secretKey);
  const pass = encrypt(process.argv[3], secretKey);

  console.log(
    chalk
      .hex('#2ed573')
      .bold(
        `\nDB_USER="${user}"\nDB_PASS="${pass}"\nCRYPTO_KEY="${secretKey}"\n`
      )
  );
}

cryptoConnection();
