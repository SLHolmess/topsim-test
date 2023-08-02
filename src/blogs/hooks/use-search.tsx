import { useState, createContext, useContext, useEffect } from 'react';
import Fuse from 'fuse.js';

import { getSearchData } from '../lib/search';

const SEARCH_KEYS = ['slug', 'title'];

export const SEARCH_STATE_LOADING = 'LOADING';
export const SEARCH_STATE_READY = 'READY';
export const SEARCH_STATE_ERROR = 'ERROR';
export const SEARCH_STATE_LOADED = 'LOADED';

// export const SearchContext = createContext();
export let SearchContext = {};

export function useSearchState() {
  const [state, setState] = useState(SEARCH_STATE_READY);
  const [data, setData]: any = useState(null);

  let client;

  if (data) {
    client = new Fuse(data.posts, {
      keys: SEARCH_KEYS,
      isCaseSensitive: false,
    });
  }

  // On load, we want to immediately pull in the search index, which we're
  // storing clientside and gets built at compile time

  useEffect(() => {
    (async function getData() {
      setState(SEARCH_STATE_LOADING);

      let searchData;

      try {
        searchData = await getSearchData();
      } catch (e) {
        setState(SEARCH_STATE_ERROR);
        return;
      }

      setData(searchData);
      setState(SEARCH_STATE_LOADED);
    })();
  }, []);

  return {
    state,
    data,
    client,
  };
}

export default function useSearch({ searchData = [], defaultQuery = null, maxResults }: any = {}) {
  // const search: any = useContext(SearchContext);
  const search = Array.from(searchData);

  const [query, setQuery] = useState(defaultQuery);

  let results: Array<any> = [];

  // If we have a query, make a search. Otherwise, don't modify the
  // results to avoid passing back empty results

  if (query) {
    // results = client.search(query).map(({ item }: any) => item);
    results = search.filter((item: any) => item.node.title.toLowerCase().includes(query.toLowerCase()) && results.length <= maxResults);
  }

  // if (maxResults && results.length > maxResults) {
  //   results = results.slice(0, maxResults);
  // }

  // If the defaultQuery argument changes, the hook should reflect
  // that update and set that as the new state

  useEffect(() => setQuery(defaultQuery), [defaultQuery]);

  /**
   * handleSearch
   */

  function handleSearch({ query }: any) {
    setQuery(query);
  }

  /**
   * handleClearSearch
   */

  function handleClearSearch() {
    setQuery(null);
  }

  return {
    ...search,
    query,
    results,
    search: handleSearch,
    clearSearch: handleClearSearch,
  };
}
