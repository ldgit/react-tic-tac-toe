import { useEffect } from 'react';
import { queryStringToActions, actionsToState } from '../url-query-state';

export default function useReadStateFromUrl(setState) {
  useEffect(() => {
    const [, queryString] = window.location.href.split('?');
    const actions = queryStringToActions(queryString);
    const newState = actionsToState(actions);

    setState(newState);
  }, [setState]);
}
