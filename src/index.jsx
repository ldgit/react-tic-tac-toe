import React from 'react';
import ReactDom from 'react-dom';
import Game from './components/Game';
import UltimateGame from './components/UltimateGame';
import './index.css';

const ultimateGameApp = document.createElement('div');
const normalGameApp = document.createElement('div');
document.body.appendChild(ultimateGameApp);
document.body.appendChild(normalGameApp);
ReactDom.render(<UltimateGame />, ultimateGameApp);
ReactDom.render(<Game />, normalGameApp);
