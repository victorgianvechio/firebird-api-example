import '../lib/dotenv';
import jwt from 'jsonwebtoken';
import chalk from 'chalk';
import authConfig from '../config/auth';
import { writeFile, createFile } from './logger';

/*
  Para gerar um token informar o nome e a validade em número de dias
  ex:
    yarn token name 3  = válido para 3 dias
    yarn token name 7  = válido para 7 dias
    yarn token name 30 = válido para 30 dias
    yarn token name -n = token sem data de validade
*/

function generateToken() {
  // const value = new Date();
  const value = process.argv[2];
  const days = process.argv[3];
  const today = new Date().getTime();
  let expiresDate = '';
  let expiresIn = '';
  let token = '';

  if (days === undefined || value === undefined) {
    console.log(
      chalk.hex('#f00').bold('\nInvalid arguments [name expiresIn]\n')
    );
  } else if (days === '-n') {
    token = jwt.sign({ value }, authConfig.secret, {});
    expiresDate = 'Unlimited Token';
    expiresIn = days;

    console.log(chalk.hex('#fffa65').bold(`\n${token}`));
    console.log(chalk.hex('#2ed573').bold(`\n${expiresDate}\n`));
  } else {
    expiresIn = `${days}d`;
    token = jwt.sign({ value }, authConfig.secret, {
      expiresIn,
    });

    expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + Number(days));

    console.log(chalk.hex('#fffa65').bold(`\n${token}`));
    console.log(chalk.hex('#2ed573').bold(`\nExpires in: ${expiresDate}\n`));
  }

  // GERA LOG
  createFile(`token-${value}-${today}`);
  writeFile(
    `Created:\t${new Date()}\nUser:\t\t\t${value}\nCommand:\t${expiresIn}\nToken:\t\t${token}\nExpires:\t${expiresDate}\nSecret:\t\t${
      process.env.APP_SECRET
    }`
  );
}

generateToken();
