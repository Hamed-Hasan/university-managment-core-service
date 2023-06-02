import { createLogger, format, transports } from 'winston';
import path from 'path';

// Define the log folder path
const logFolder = path.join(process.cwd(), 'logs');

// Define your logger configuration
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json({ space: 2 })
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp(),
        format.json({ space: 2 })
      ),
    }),
    new transports.File({
      filename: path.join(logFolder, 'error/error.log'),
      level: 'error',
      format: format.combine(
        format.timestamp(),
        format.json({ space: 2 })
      ),
    }),
    new transports.File({
      filename: path.join(logFolder, 'success/success.log'),
      level: 'info',
      format: format.combine(
        format.timestamp(),
        format.json({ space: 2 })
      ),
    }),
    new transports.File({
      filename: path.join(logFolder, 'info/info.log'),
      level: 'info',
      format: format.combine(
        format.timestamp(),
        format.json({ space: 2 })
      ),
    }),
    new transports.File({
      filename: path.join(logFolder, 'warning/warning.log'),
      level: 'warn',
      format: format.combine(
        format.timestamp(),
        format.json({ space: 2 })
      ),
    }),
  ],
});

export default logger;
