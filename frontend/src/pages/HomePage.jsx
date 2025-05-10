
import React from 'react';
import Header from '../layout/Header';


const HomePage = () => { 
  return (
    <div className="homepage min-h-screen flex" style={{ overflowX:'hidden', overflowY:'scroll'}}>
      <div className="main-content flex-1">
        <Header />
        <div className="content" style={{ position: 'relative', left: '8%'}}>
        <h1>Welcome to the Homepage</h1>
        <p>This is the main content area.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
