import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import * as schema from './schema';

export const poolConnection = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '', // Update password
  database: 'explorer_app',
  // Wait for connection before acquire
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const db = drizzle(poolConnection, { schema, mode: 'default' });
