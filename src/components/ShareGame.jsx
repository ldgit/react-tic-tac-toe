import React, { useState } from 'react';
import { historyToActions, actionsToQueryString } from '../url-query-state';

export default function ShareGame({ gameState }) {
  const [urlToShare, setUrlToShare] = useState('');
  function displayUrlToShare() {
    const query = actionsToQueryString(historyToActions(gameState.history));
    const { protocol, host, pathname } = window.location;
    const urlWithoutQuery = `${protocol}//${host}${pathname}`;
    setUrlToShare(`${urlWithoutQuery}?${query}`);
  }

  return (
    <>
      <button type="button" className="button" onClick={displayUrlToShare}>
        Share game
      </button>
      <input
        type="text"
        className="urlShareInput"
        readOnly
        data-testid="urlShareInput"
        value={urlToShare}
      />
    </>
  );
}
