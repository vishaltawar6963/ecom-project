const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// routes import 
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/productRoutes');



require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const connectDB = require('./config/db');
connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Routes
app.use('/api/auth', authRoutes);

// Product CRUD 
app.use('/api/products', productRoutes);




// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
// RNVDVPUEoB6YA50M