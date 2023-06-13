import app from './app';
import logger from './logger';

const port = 8000;

const server = app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

// Handling unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  logger.error('Unhandled Promise rejection:', err);
  // Perform any necessary cleanup or actions here
  // ...

  // Exit the process with a non-zero status code
  process.exit(1);
});

// Handling uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  logger.error('Uncaught Exception:', err);
  // Perform any necessary cleanup or actions here
  // ...

  // Exit the process with a non-zero status code
  process.exit(1);
});

// Graceful shutdown on SIGINT and SIGTERM signals
const shutdown = () => {
  logger.info('Shutting down gracefully...');
  // Perform any necessary cleanup or actions here
  // ...

  server.close(() => {
    logger.info('Server is gracefully closed');
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
