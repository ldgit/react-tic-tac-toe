import React from 'react';
import ReactDom from 'react-dom';
import Game from './components/Game';
import './index.css';

const app = document.createElement('div');
document.body.appendChild(app);
ReactDom.render(<Game />, app);
