import pg from "pg";
import "dotenv/config";

// Create a pool of connections for better performance
const db = new pg.Pool({
  user:
    process.env.APP_ENV === "dev"
      ? process.env.DB_USER_LOCALHOST
      : process.env.DB_USER,
  host:
    process.env.APP_ENV === "dev"
      ? process.env.DB_HOST_LOCALHOST
      : process.env.DB_HOST,
  database:
    process.env.APP_ENV === "dev"
      ? process.env.DB_NAME_LOCALHOST
      : process.env.DB_NAME,
  password:
    process.env.APP_ENV === "dev"
      ? process.env.DB_PASSWORD_LOCALHOST
      : process.env.DB_PASSWORD,
  port:
    process.env.APP_ENV === "dev"
      ? process.env.DB_PORT_LOCALHOST
      : process.env.DB_PORT,
});

export default db;
