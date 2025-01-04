import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomNavbar from './components/Navbar';
import NewsList from './components/NewsList';
import Login from './components/Login';
import Register from './components/Register';
import AddNews from './components/AddNews';

const App = () => {
    return (
        <Router>
            <div>
                <CustomNavbar />
                <div style={{ paddingTop: '56px' }}>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/add-news" element={<AddNews />} />
                        <Route path="/" element={<NewsList />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
