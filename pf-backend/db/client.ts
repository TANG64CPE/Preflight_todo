import { drizzle as drizzlePg } from "drizzle-orm/postgres-js";
import { drizzle as drizzlePglite } from "drizzle-orm/pglite";
import * as schema from "./schema.js";
import postgres from "postgres";
import { PGlite } from "@electric-sql/pglite";
import path from "path";
import fs from "fs";

const dbUser = process.env.POSTGRES_APP_USER || process.env.POSTGRES_USER || "postgres";
const dbPassword = process.env.POSTGRES_APP_PASSWORD || process.env.POSTGRES_PASSWORD || "postgres_secure_password";
const dbHost = process.env.POSTGRES_HOST || "localhost";
const dbPort = process.env.POSTGRES_PORT || "5432";
const dbName = process.env.POSTGRES_DB || "mydb";

const connectionString = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

let dbClient: any;
let dbConn: any;

const initPglite = async () => {
  const dataDir = path.join(process.cwd(), ".pgdata");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const client = new PGlite(dataDir);
  await client.exec(`
    CREATE TABLE IF NOT EXISTS todo (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      todo_text VARCHAR(255) NOT NULL,
      is_done BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMP(3)
    );
  `);
  dbConn = client;
  dbClient = drizzlePglite(client, { schema, logger: true });
};

try {
  const sql = postgres(connectionString, { max: 1, connect_timeout: 2, idle_timeout: 2 });
  await sql`SELECT 1`;
  dbConn = sql;
  dbClient = drizzlePg(sql, { schema, logger: true });
  console.log(`Connected to PostgreSQL database at ${dbHost}:${dbPort}`);
} catch (e) {
  console.log(`PostgreSQL not reachable at ${dbHost}:${dbPort}. Falling back to embedded PGlite database.`);
  await initPglite();
}

export { dbClient, dbConn };

