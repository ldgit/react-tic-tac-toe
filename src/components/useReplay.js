import { useState, useEffect } from 'react';
import { historyToActions, actionsToState } from '../url-query-state';

export default function useReplay(setState) {
  const [replayInProgress, setReplayInProgress] = useState(false);
  const [currentAction, setCurrentAction] = useState(0);
  const [historyToReplay, setHistoryToReplay] = useState(null);

  useEffect(() => {
    if (!replayInProgress) {
      return;
    }

    const actions = historyToActions(historyToReplay).slice(0, currentAction);
    if (currentAction >= historyToReplay.length) {
      setReplayInProgress(false);
      return;
    }

    setTimeout(() => {
      setState(actionsToState(actions));
      setCurrentAction(previousAction => previousAction + 1);
    }, 1000);
  }, [replayInProgress, currentAction, historyToReplay, setState]);

  return {
    startReplay(history) {
      setHistoryToReplay(history);
      setReplayInProgress(true);
      setCurrentAction(0);
    },
    replayInProgress,
  };
}
