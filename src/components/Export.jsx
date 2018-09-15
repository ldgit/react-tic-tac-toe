import React from 'react';

export default class ExportGameState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: null,
      displayTextarea: false,
    };
    this.handleExportClick = this.handleExportClick.bind(this);
    this.handleCloseButtonClick = this.handleCloseButtonClick.bind(this);
  }

  handleExportClick() {
    const { gameState } = this.props;

    this.setState({ gameState, displayTextarea: gameState || false });
  }

  handleCloseButtonClick() {
    this.setState({ displayTextarea: false });
  }

  render() {
    const { gameState, displayTextarea } = this.state;
    const closeButton = <button type="button" onClick={this.handleCloseButtonClick}>Close</button>;
    const textarea = (
      <textarea
        readOnly
        value={gameState ? JSON.stringify(gameState) : ''}
      />
    );

    return (
      <span>
        <button type="button" onClick={this.handleExportClick}>Export</button>
        {displayTextarea && closeButton}
        <br />
        {displayTextarea && textarea}
      </span>
    );
  }
}
