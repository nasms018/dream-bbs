import './index.css';
import App from './App';
import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import BBSNav from 'layout/BBSNav';
import Footer from 'layout/Footer';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppContextProvider } from 'context/AppContextProvider';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <AppContextProvider>
        <Router>
            <BBSNav></BBSNav>
            <App />
            <Footer></Footer>
        </Router>
    </AppContextProvider>

);

reportWebVitals();
