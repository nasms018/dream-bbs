import './index.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import BBSNav from 'layout/BBSNav';
import Footer from 'layout/Footer';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from 'context/AuthProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <Router>
            <BBSNav></BBSNav>
            <App />
            <Footer></Footer>
        </Router>
    </AuthProvider>
);

reportWebVitals();
