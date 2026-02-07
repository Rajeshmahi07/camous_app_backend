const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');
const errorHandler = require('./middlewares/errorMiddleware');

// Load environment variables FIRST
dotenv.config();

// Initialize app
const app = express();

// Connect to MongoDB
connectDB();

// Import routes
const authRoutes = require('./routes/authRoutes');
const companyRoutes = require('./routes/companyRoutes');

// ======== MIDDLEWARES ======== //
app.use(express.json());
app.use(cookieParser());

// ======== CORS CONFIG ======== //
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? process.env.CLIENT_URL
        : [
            'http://localhost:5173',
            'http://localhost:8080'
          ],
    credentials: true,
  })
);

// ======== ROUTES ======== //
app.use('/api/auth', authRoutes);
app.use('/api/company', companyRoutes);

// Test Route (Health Check)
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend Connected Successfully',
    status: 'running',
  });
});

// Error handler (ALWAYS LAST)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION:', err);
  server.close(() => process.exit(1));
});
