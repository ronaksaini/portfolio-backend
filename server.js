// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const corsOptions = {
  origin: 'https://ronaktanwarportfolio.netlify.app/', // Replace with your Netlify frontend URL
};

// Use CORS middleware with options
app.use(cors(corsOptions));
// Body parser middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://sainironak838:6VvlkzSYOD7WemOX@portfolio-contact.wv7ciea.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create MongoDB Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// Create API endpoint for saving contact form data
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to send message. Please try again later.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
