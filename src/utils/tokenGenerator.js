import '../lib/dotenv';
import jwt from 'jsonwebtoken';
import chalk from 'chalk';
import authConfig from '../config/auth';

/*
  Para gerar um token com validade passar o número de dias
  ex:
    yarn token 3  = válido para 3 dias
    yarn token 7  = válido para 7 dias
    yarn token 30 = válido para 30 dias
    yarn token -n = token sem data de validade
*/

function generateToken() {
  const value = new Date();
  const command = process.argv[2];
  let token = '';

  if (command === undefined) {
    console.log(chalk.hex('#f00').bold('\nInvalid arguments [expiresIn]\n'));
  } else if (command === '-n') {
    token = jwt.sign({ value }, authConfig.secret, {});

    console.log(chalk.hex('#fffa65').bold(`\n${token}`));
    console.log(chalk.hex('#2ed573').bold(`\nUnlimited Token\n`));
  } else {
    const expiresIn = `${command}d`;
    token = jwt.sign({ value }, authConfig.secret, {
      expiresIn,
    });

    const expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + Number(command));

    console.log(chalk.hex('#fffa65').bold(`\n${token}`));
    console.log(chalk.hex('#2ed573').bold(`\nExpires in: ${expiresDate}\n`));
  }
}

generateToken();
