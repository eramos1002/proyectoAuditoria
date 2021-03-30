import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './css/sb-admin-2.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

const app = document.getElementById('app');

ReactDOM.render(<App />, app);

require('./sb-admin-2.js');
