/**
 * getSearchData
 */

 export async function getSearchData() {
    const response = await fetch('/bai-viet/wp-search.json');
    const json = await response.json();
    return json;
  }
  