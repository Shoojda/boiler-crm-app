const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// After db = mysql.createPool(...)
db.query('SELECT 1')
  .then(() => console.log('✅ DB connection OK'))
  .catch(err => {
    console.error('❌ DB connection failed:', err);
    process.exit(1);  // Exit early with error
  });


module.exports = pool;
