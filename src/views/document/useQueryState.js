import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import qs from 'qs';
import { createBrowserHistory } from 'history';

export const useQueryState = (query) => {
    const location = useLocation();
    const history = createBrowserHistory()

    const setQuery = useCallback(
        (value) => {
            const existingQueries = qs.parse(location.search, {
                ignoreQueryPrefix: true,
            });

            const queryString = qs.stringify(
                { ...existingQueries, [query]: value },
                { skipNulls: true }
            );
            history.push(`${location.pathname}?${queryString}`);
        },
        [history, location, query]
    );

    return [
        qs.parse(location.search, { ignoreQueryPrefix: true })[query],
        setQuery,
    ];
};