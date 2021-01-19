import { createWriteStream } from 'fs';
import { format } from 'util';
import { join } from 'path';
import { logsDir } from './publicPaths';

let logFile = '';

const createFile = name => {
  logFile = createWriteStream(join(logsDir, `${name}.log`), {
    flags: 'w',
  });
};

const writeFile = async d => {
  logFile.write(`${format(d)}\n`);
};

export { writeFile, createFile };
