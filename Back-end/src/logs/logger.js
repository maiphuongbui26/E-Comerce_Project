const winston = require('winston');
const path = require('path');
const { format } = winston;

// Custom format for pretty logging
const customFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.colorize(),
  format.printf(({ timestamp, level, message, ...meta }) => {
    const metaStr = Object.keys(meta).length ? `\n${JSON.stringify(meta, null, 2)}` : '';
    return `[${timestamp}] ${level}: ${message}${metaStr}`;
  })
);

// Custom format for file logging
const fileFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(({ timestamp, level, message, ...meta }) => {
    const metaStr = Object.keys(meta).length ? `\n${JSON.stringify(meta, null, 2)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaStr}`;
  })
);

const logger = winston.createLogger({
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
  },
  format: fileFormat,
  transports: [
    // System logs
    new winston.transports.File({
      filename: path.join(__dirname, 'system/system.log'),
      level: 'info',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      tailable: true
    }),
    // Error logs
    new winston.transports.File({
      filename: path.join(__dirname, 'errors/error.log'),
      level: 'error',
      maxsize: 5242880,
      maxFiles: 5,
      tailable: true
    }),
    // Database logs
    new winston.transports.File({
      filename: path.join(__dirname, 'database/db.log'),
      level: 'info',
      maxsize: 5242880,
      maxFiles: 5,
      tailable: true
    }),
    // Access logs
    new winston.transports.File({
      filename: path.join(__dirname, 'access/access.log'),
      level: 'http',
      maxsize: 5242880,
      maxFiles: 5,
      tailable: true
    })
  ]
});

// Add console logging in development with colors
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: customFormat,
    level: 'debug'
  }));
}

// Add custom colors
winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue'
});

module.exports = logger;