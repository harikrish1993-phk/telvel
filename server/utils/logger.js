import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logsDir = path.resolve(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });

const appLog = path.join(logsDir, 'app.log');
const errLog = path.join(logsDir, 'error.log');

function write(f, l) { try { fs.appendFileSync(f, l + '\n'); } catch {} }
function fmt(level, msg, detail) {
  return `[${new Date().toISOString()}] [${level}] ${msg}${detail ? ' ' + detail : ''}`;
}

export const log = {
  info(m, d)  { const l = fmt('INFO', m, d);  console.log(`\x1b[36m${l}\x1b[0m`);   write(appLog, l); },
  warn(m, d)  { const l = fmt('WARN', m, d);  console.log(`\x1b[33m${l}\x1b[0m`);   write(appLog, l); },
  error(m, d) { const l = fmt('ERROR', m, d); console.error(`\x1b[31m${l}\x1b[0m`); write(appLog, l); write(errLog, l); },
};
