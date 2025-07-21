app.post('/contacts', (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Fake DB: store in memory (or push to real DB in future)
  const newContact = {
    id: Math.floor(Math.random() * 100000),
    name,
    email,
    phone,
  };

  contacts.push(newContact); // assuming contacts = []

  res.status(201).json(newContact);
});
