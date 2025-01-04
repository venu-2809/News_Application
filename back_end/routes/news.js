const express = require('express');
const News = require('../models/News');
const auth = require('../middleware/auth'); 
const router = express.Router();

// Get all news articles
router.get('/', async (req, res) => {
    try {
        const news = await News.find();
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Search news articles
router.get('/search', async (req, res) => {
    const { query } = req.query;
    try {
        const results = await News.find({ $text: { $search: query } });
        res.json(results);
    } catch (error) {
        console.error('Error searching for news:', error); // Log the error
        res.status(500).json({ message: error.message });
    }
});

// Get a single news article by ID
router.get('/:id', async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) return res.status(404).json({ message: 'News article not found' });
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a news article (protected route)
router.post('/', auth, async (req, res) => {
    const { title, description, content, author, source, url, publishedAt, category } = req.body;
    try {
        const news = new News({ title, description, content, author, source, url, publishedAt, category });
        await news.save();
        res.status(201).json(news);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update an existing news article by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedNews) return res.status(404).json({ message: 'News article not found' });
        res.json(updatedNews);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a news article by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedNews = await News.findByIdAndDelete(req.params.id);
        if (!deletedNews) return res.status(404).json({ message: 'News article not found' });
        res.json({ message: 'News article deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;