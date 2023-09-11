import 'bootstrap/dist/css/bootstrap.min.css';
import { AppContextProvider } from 'context/AppContextProvider';
import BBSNav from 'layout/BBSNav';
import Footer from 'layout/Footer';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';




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
