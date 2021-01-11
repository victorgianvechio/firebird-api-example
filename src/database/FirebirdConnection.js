import Firebird from 'node-firebird';
import chalk from 'chalk';
import { readFileSync } from 'fs';
import options from '../config/firebird';

class FirebirdConnection {
  async exec(query) {
    const data = new Promise(resolve => {
      Firebird.attach(options, async (attachError, db) => {
        if (attachError) throw attachError;

        await db.query(query, (queryError, result) => {
          if (queryError) {
            console.error('queryError', queryError);
            throw queryError;
          }

          db.detach();
          resolve(result);
        });
      });
    });
    return data;
  }

  async testConnection() {
    Firebird.attach(options, err => {
      if (!err) {
        console.log(chalk.hex('#2ed573').bold('\nSuccessfully connected\n'));
        return true;
      }
      console.error(chalk.hex('#f00').bold('\nFailed to connect\n'));
      console.error(err);
      return false;
    });
  }

  readSQL(path) {
    const query = readFileSync(path).toString();
    return query;
  }
}

export default new FirebirdConnection();

// async function exec(query) {
//   const data = new Promise(resolve => {
//     Firebird.attach(options, async (attachError, db) => {
//       if (attachError) throw attachError;

//       await db.query(query, (queryError, result) => {
//         if (queryError) {
//           console.error('queryError', queryError);
//           throw queryError;
//         }

//         db.detach();
//         resolve(result);
//       });
//     });
//   });
//   return data;
// }

// async function testConnection() {
//   Firebird.attach(options, err => {
//     if (!err) {
//       console.log(chalk.hex('#2ed573').bold('\nSuccessfully connected\n'));
//       return true;
//     }
//     console.error(chalk.hex('#f00').bold('\nFailed to connect\n'));
//     console.error(err);
//     return false;
//   });
// }

// function readSQL(path) {
//   const query = readFileSync(path).toString();
//   return query;
// }

// export default { exec, testConnection, readSQL };
