import dotenv from 'dotenv';

dotenv.config();

// Your environment-specific configurations go here

const config = {
  // Example config
  database: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
  },
};

export default config;
