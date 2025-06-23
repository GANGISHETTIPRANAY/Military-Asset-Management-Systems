const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

// Load environment variables from .env
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());

// 🧪 Dummy Auth Middleware (simulate a logged-in user)
app.use((req, res, next) => {
  req.user = {
    id: 1,
    role: 'admin' // change to 'commander' or 'logistics' to test role permissions
  };
  next();
});

// 👇 Import routes
const purchaseRoutes = require('./routes/purchases');
const transferRoutes = require('./routes/transfers');
const assignmentRoutes = require('./routes/assignments');

// 👇 Use routes
app.use('/api/purchases', purchaseRoutes);
app.use('/api/transfers', transferRoutes);
app.use('/api/assignments', assignmentRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
