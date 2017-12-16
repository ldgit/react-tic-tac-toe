import React from 'react';
import ReactDom from 'react-dom';
import './index.css';

function Title(props) {
  return <h1>Hello {props.name}</h1>;
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <Title name="React" />
      </div>
    );
  }
}

const app = document.createElement('div');
document.body.appendChild(app);
ReactDom.render(<Game />, app);
