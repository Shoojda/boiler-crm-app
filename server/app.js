const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Define the /contacts route here
app.get('/contacts', (req, res) => {
  res.json([
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Bob Johnson', email: 'bob@example.com', phone: '987-654-3210' },
  ]);
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
