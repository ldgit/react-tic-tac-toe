import React, { useState } from 'react';
import copy from 'copy-text-to-clipboard';
import { historyToActions, actionsToQueryString } from '../url-query-state';
import { toggleSpecialIcons } from '../actions';

export default function ShareGame({ gameState }) {
  const [urlToShare, setUrlToShare] = useState('');
  const [lastCopySuccessful, setLastCopySuccessful] = useState(null);

  function displayUrlToShare() {
    const url = createUrlToShare(gameState);
    setUrlToShare(url);
    setLastCopySuccessful(copy(url));
  }

  const copyInfoText = getCopyInfoText(lastCopySuccessful);

  return (
    <>
      <button type="button" className="button" onClick={displayUrlToShare}>
        Share game
      </button>
      <input
        type="text"
        onChange={() => {}}
        className="urlShareInput"
        data-testid="urlShareInput"
        value={urlToShare}
      />
      <span className="copyInfo">{copyInfoText}</span>
    </>
  );
}

function getCopyInfoText(lastCopySuccessful) {
  if (lastCopySuccessful === null) {
    return '';
  }

  return lastCopySuccessful ? 'Url copied' : 'Copy the url from text input';
}

function createUrlToShare(gameState) {
  const actions = historyToActions(gameState.history);
  const query = actionsToQueryString(
    gameState.specialIcons ? [toggleSpecialIcons(), ...actions] : actions,
  );
  const { protocol, host, pathname } = window.location;
  const urlWithoutQuery = `${protocol}//${host}${pathname}`;

  return `${urlWithoutQuery}?${query}`;
}
