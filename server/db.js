// server/db.js (CommonJS)
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "127.0.0.1",
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 20000,
});

(async () => {
  try {
    await pool.query("SELECT 1");
    console.log("✅ DB connected via Cloud SQL Proxy");
  } catch (err) {
    console.error("❌ DB connection failed:", err);
  }
})();

module.exports = pool;