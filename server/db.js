// server/db.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();



console.log('🔌 Connecting to MySQL with:');
console.log('  Host:', process.env.DB_HOST);
console.log('  User:', process.env.DB_USER);
console.log('  Database:', process.env.DB_NAME);

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
