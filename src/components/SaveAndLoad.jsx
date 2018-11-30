import React from 'react';
import LoadGame from './LoadGame';

export default class SaveAndLoad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayExportGameTextarea: false,
      displayImportGameTextarea: false,
    };
    this.handleExportClick = this.handleExportClick.bind(this);
    this.handleCloseButtonClick = this.handleCloseButtonClick.bind(this);
    this.handleLoadClick = this.handleLoadClick.bind(this);
    this.handleLoadGameClick = this.handleLoadGameClick.bind(this);
  }

  handleExportClick() {
    const { gameState } = this.props;

    this.setState({ displayExportGameTextarea: gameState || false, displayImportGameTextarea: false });
  }

  handleLoadClick() {
    this.setState({ displayImportGameTextarea: true, displayExportGameTextarea: false });
  }

  handleLoadGameClick(newGameState) {
    const { onLoadGameClick } = this.props;

    this.setState({ displayImportGameTextarea: false, displayExportGameTextarea: false });
    onLoadGameClick(newGameState);
  }

  handleCloseButtonClick() {
    this.setState({ displayExportGameTextarea: false, displayImportGameTextarea: false });
  }

  render() {
    const { gameState } = this.props;
    const { displayExportGameTextarea, displayImportGameTextarea } = this.state;
    const closeButton = <button type="button" onClick={this.handleCloseButtonClick}>Close</button>;

    return (
      <span>
        <button type="button" onClick={this.handleExportClick}>Save</button>
        <button type="button" onClick={this.handleLoadClick}>Load</button>
        {(displayExportGameTextarea || displayImportGameTextarea) && closeButton}
        <br />
        {displayExportGameTextarea && <SaveGame gameState={gameState} />}
        {displayImportGameTextarea && <LoadGame onLoadGameClick={this.handleLoadGameClick} />}
      </span>
    );
  }
}

function SaveGame({ gameState }) {
  return (
    <textarea
      data-testid="exportGameTextarea"
      readOnly
      value={gameState ? JSON.stringify(gameState) : ''}
    />
  );
}
