import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/initialize'
import App from './App';
import './styles.scss';
import './styles/main.scss';

const ROOT = document.getElementById('root');

ReactDOM.render(<Provider store={store}><App /></Provider>, ROOT);
