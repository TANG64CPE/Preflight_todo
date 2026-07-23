import "dotenv/config";

const dbUser = process.env.POSTGRES_APP_USER || process.env.POSTGRES_USER || "appuser";
const dbPassword = process.env.POSTGRES_APP_PASSWORD || process.env.POSTGRES_PASSWORD || "appuser_secure_password";
const dbHost = process.env.POSTGRES_HOST || "localhost";
const dbPort = process.env.POSTGRES_PORT || "5432";
const dbName = process.env.POSTGRES_DB || "mydb";

export const connectionString = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
