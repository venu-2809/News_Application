const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const News = require('./models/News');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

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

app.get('/news', async (req, res) => {
    try {
        const news = await News.find();
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/news/:id', async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) return res.status(404).json({ message: 'News article not found' });
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/news', async (req, res) => {
    const news = new News(req.body);
    try {
        const savedNews = await news.save();
        res.status(201).json(savedNews);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.put('/news/:id', async (req, res) => {
    try {
        const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedNews) return res.status(404).json({ message: 'News article not found' });
        res.json(updatedNews);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/news/:id', async (req, res) => {
    try {
        const deletedNews = await News.findByIdAndDelete(req.params.id);
        if (!deletedNews) return res.status(404).json({ message: 'News article not found' });
        res.json({ message: 'News article deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/', (req, res) => {
    res.send('Backend is working!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
