const express = require('express');
const router = express.Router();

// In-memory contact list for testing
const contacts = [
  {
    id: 1,
    name: 'Alice Smith',
    email: 'alice@example.com',
    phone: '123-456-7890',
  },
  {
    id: 2,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '987-654-3210',
  },
];

// GET /api/contacts → Get all contacts
router.get('/contacts', (req, res) => {
  res.json(contacts);
});

// POST /api/contacts → Add a new contact
router.post('/contacts', (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const emailExists = contacts.some((c) => c.email === email);
  if (emailExists) {
    return res.status(409).json({ error: 'Email already exists.' });
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

module.exports = router;
