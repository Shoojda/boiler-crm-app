const express = require('express');
const cors = require('cors');
const routes = require('./server/routes/index'); // ← Make sure this file exists

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', routes); // all routes will be under /api

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
