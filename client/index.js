import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
//import './css/sb-admin-2.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

const app = document.getElementById('app');

ReactDOM.render(<App />, app);

require('./sb-admin-2.js');

// Routing
// https://stackoverflow.com/questions/43209666/react-router-v4-cannot-get-url
// https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writing-manually
