import React from 'react';

export default class LoadGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameToImport: {},
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleLoadGameClick = this.handleLoadGameClick.bind(this);
  }

  handleOnChange(event) {
    this.setState({ gameToImport: event.target.value });
  }

  handleLoadGameClick() {
    const { gameToImport } = this.state;
    const { onLoadGameClick } = this.props;

    if (!isValidJSON(gameToImport)) {
      // eslint-disable-next-line no-alert
      window.alert('Invalid save game JSON');
      return;
    }

    onLoadGameClick(JSON.parse(gameToImport));
  }

  render() {
    return (
      <span>
        <textarea
          data-testid="importGameTextarea"
          onChange={this.handleOnChange}
        />
        <br />
        <button type="button" onClick={this.handleLoadGameClick}>Load game</button>
      </span>
    );
  }
}

function isValidJSON(jsonString) {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (e) {
    return false;
  }
}
