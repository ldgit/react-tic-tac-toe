import React, { useState } from 'react';
import { historyToActions, actionsToQueryString } from '../url-query-state';
import { toggleSpecialIcons } from '../actions';

export default function ShareGame({ gameState }) {
  const [urlToShare, setUrlToShare] = useState('');
  function displayUrlToShare() {
    const actions = historyToActions(gameState.history);
    const query = actionsToQueryString(
      gameState.specialIcons ? [toggleSpecialIcons(), ...actions] : actions,
    );
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
        onChange={() => {}}
        className="urlShareInput"
        data-testid="urlShareInput"
        value={urlToShare}
      />
    </>
  );
}
