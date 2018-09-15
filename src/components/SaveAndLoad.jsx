import React from 'react';
import LoadGame from './LoadGame';

export default class SaveAndLoad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: null,
      displayExportGameTextarea: false,
      displayImportGameTextarea: false,
    };
    this.handleExportClick = this.handleExportClick.bind(this);
    this.handleCloseButtonClick = this.handleCloseButtonClick.bind(this);
    this.handleLoadClick = this.handleLoadClick.bind(this);
  }

  handleExportClick() {
    const { gameState } = this.props;

    this.setState({ gameState, displayExportGameTextarea: gameState || false, displayImportGameTextarea: false });
  }

  handleLoadClick() {
    const { gameState } = this.props;

    this.setState({ gameState, displayImportGameTextarea: true, displayExportGameTextarea: false });
  }

  handleCloseButtonClick() {
    this.setState({ displayExportGameTextarea: false, displayImportGameTextarea: false });
  }

  render() {
    const { gameState, displayExportGameTextarea, displayImportGameTextarea } = this.state;
    const { onLoadGameClick } = this.props;
    const closeButton = <button type="button" onClick={this.handleCloseButtonClick}>Close</button>;

    return (
      <span>
        <button type="button" onClick={this.handleExportClick}>Save</button>
        <button type="button" onClick={this.handleLoadClick}>Load</button>
        {(displayExportGameTextarea || displayImportGameTextarea) && closeButton}
        <br />
        {displayExportGameTextarea && <SaveGame gameState={gameState} />}
        {displayImportGameTextarea && <LoadGame onLoadGameClick={onLoadGameClick} />}
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
