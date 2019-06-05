import React, { useState } from 'react';
import LoadGame from './LoadGame';

export default function SaveAndLoad({ gameState, onLoadGameClick }) {
  const [displayExportGameTextarea, setDisplayExportGameTextarea] = useState(
    false,
  );
  const [displayImportGameTextarea, setDisplayImportGameTextarea] = useState(
    false,
  );

  function handleExportClick() {
    setDisplayImportGameTextarea(false);
    setDisplayExportGameTextarea(gameState || false);
  }

  function handleLoadClick() {
    setDisplayImportGameTextarea(true);
    setDisplayExportGameTextarea(false);
  }

  function handleLoadGameClick(newGameState) {
    setDisplayImportGameTextarea(false);
    setDisplayExportGameTextarea(false);
    onLoadGameClick(newGameState);
  }

  function handleCloseButtonClick() {
    setDisplayImportGameTextarea(false);
    setDisplayExportGameTextarea(false);
  }

  const closeButton = (
    <button type="button" onClick={handleCloseButtonClick}>
      Close
    </button>
  );

  return (
    <span>
      <button type="button" onClick={handleExportClick}>
        Save
      </button>
      <button type="button" onClick={handleLoadClick}>
        Load
      </button>
      {(displayExportGameTextarea || displayImportGameTextarea) && closeButton}
      <br />
      {displayExportGameTextarea && <SaveGame gameState={gameState} />}
      {displayImportGameTextarea && (
        <LoadGame onLoadGameClick={handleLoadGameClick} />
      )}
    </span>
  );
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
