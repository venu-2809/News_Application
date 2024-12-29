import React from 'react';
import CustomNavbar from './components/Navbar';
import NewsList from './components/Newslist';

const App = () => {
    return (
        <div>
            <CustomNavbar />
            <div style={{ paddingTop: '56px' }}> {/* Add padding to avoid content being hidden behind the navbar */}
                <NewsList />
            </div>
        </div>
    );
};

export default App;
