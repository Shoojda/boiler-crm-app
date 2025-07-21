const express = require('express');
const router = express.Router();

// Temporary in-memory storage
let contacts = [
  {
    id: 1,
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice@example.com',
    phone: '123-456-7890',
    address: '123 Main St',
    make: 'Rheem',
    model: 'X500',
    installationDate: '2022-01-01',
    lastServiceDate: '2023-01-01',
    serviceFrequency: 12,
    nextServiceDate: '2024-01-01',
    serviceLog: [],
  },
];

// GET /api/contacts → list all contacts
router.get('/contacts', (req, res) => {
  res.json(contacts);
});

// POST /api/contacts → create new contact
router.post('/contacts', (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    make,
    model,
    installationDate,
    lastServiceDate,
    serviceFrequency,
  } = req.body;

  if (!firstName || !lastName || !email || !phone || !address) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const id = contacts.length + 1;
  const newContact = {
    id,
    firstName,
    lastName,
    email,
    phone,
    address,
    make,
    model,
    installationDate,
    lastServiceDate,
    serviceFrequency: serviceFrequency || 12,
    nextServiceDate: calculateNextServiceDate(lastServiceDate, serviceFrequency),
    serviceLog: [],
  };

  contacts.push(newContact);
  res.status(201).json({ message: 'Contact added successfully', contact: newContact });
});

// Utility: calculate next service date
function calculateNextServiceDate(lastDate, freqMonths = 12) {
  const date = new Date(lastDate);
  date.setMonth(date.getMonth() + freqMonths);
  return date.toISOString().split('T')[0];
}

module.exports = router;
