const express = require('express');
const router = express.Router();

// Test route to verify API is working
router.get('/', (req, res) => {
  res.send('API is working ✅');
});

module.exports = router;
