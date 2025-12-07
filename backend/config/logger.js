import { config } from './env.js';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const colors = {
  error: '\x1b[31m',
  warn: '\x1b[33m',
  info: '\x1b[36m',
  debug: '\x1b[90m',
  reset: '\x1b[0m',
};

const log = (level, message, meta = {}) => {
  if (levels[level] > levels[config.env === 'production' ? 'info' : 'debug']) {
    return;
  }

  const timestamp = new Date().toISOString();
  const color = colors[level];
  const reset = colors.reset;

  const logMessage = `${color}[${timestamp}] [${level.toUpperCase()}]${reset} ${message}`;

  if (Object.keys(meta).length > 0) {
    console.log(logMessage, meta);
  } else {
    console.log(logMessage);
  }
};

export const logger = {
  error: (message, meta) => log('error', message, meta),
  warn: (message, meta) => log('warn', message, meta),
  info: (message, meta) => log('info', message, meta),
  debug: (message, meta) => log('debug', message, meta),
};
