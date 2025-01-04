import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddNews.css';

const AddNews = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [source, setSource] = useState('');
    const [url, setUrl] = useState('');
    const [publishedAt, setPublishedAt] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://localhost:3000/api/news', {
                title, description, content, author, source, url, publishedAt, category
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('News added successfully');
            navigate('/');
        } catch (error) {
            alert('Failed to add news');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required />
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" required />
            <input type="text" value={source} onChange={(e) => setSource(e.target.value)} placeholder="Source" required />
            <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL" required />
            <input type="datetime-local" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} required />
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" required />
            <button type="submit">Add News</button>
        </form>
    );
};

export default AddNews;