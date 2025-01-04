const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const newsRoutes = require('./routes/news');
const authRoutes = require('./routes/auth');
const User = require('./models/User'); // Ensure you have the User model
dotenv.config(); // Load environment variables

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};
connectDB();

// Use the routes with /api prefix
app.use('/api/news', newsRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Backend is working!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
