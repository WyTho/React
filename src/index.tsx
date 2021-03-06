// allows this chart-plugin (for chart.js) to be used globally
import 'chartjs-plugin-datalabels';
import 'chartjs-plugin-annotation';
import 'chartjs-plugin-style';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/initialize';
import App from './App';
import './styles.scss';
import './styles/main.scss';

const ROOT = document.getElementById('root');
ReactDOM.render(<Provider store={store}><App /></Provider>, ROOT);
