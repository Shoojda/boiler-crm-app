const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory contact list
const contacts = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com', phone: '123-456-7890' },
  { id: 2, name: 'Bob Johnson', email: 'bob@example.com', phone: '987-654-3210' },
];

// GET route
app.get('/contacts', (req, res) => {
  res.json(contacts);
});

// ✅ POST route — make sure this is here and error-free
app.post('/contacts', (req, res) => {
  const { name, email, phone } = req.body;

  // Basic validation
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'All fields (name, email, phone) are required.' });
  }

  // Check for duplicate email
  const emailExists = contacts.some((c) => c.email === email);
  if (emailExists) {
    return res.status(409).json({ error: 'A contact with this email already exists.' });
  }

  const newContact = {
    id: contacts.length + 1,
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  res.status(201).json({ message: 'Contact added successfully', contact: newContact });
});
