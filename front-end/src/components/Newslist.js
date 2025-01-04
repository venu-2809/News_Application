import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import './NewsList.css';

const NewsList = () => {
    const [news, setNews] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/news');
                setNews(response.data);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, []);

    const displayNews = searchResults.length > 0 ? searchResults : news;

    return (
        <Container>
            <SearchBar setSearchResults={setSearchResults} />
            <Row>
                {displayNews.map((article) => (
                    <Col key={article._id} sm={12} md={6} lg={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{article.title}</Card.Title>
                                <Card.Text>{article.description}</Card.Text>
                                <Button variant="primary" href={article.url} target="_blank" rel="noopener noreferrer">
                                    Learn more
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default NewsList;