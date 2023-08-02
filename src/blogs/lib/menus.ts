import { getApolloClient } from './apollo-client';
import { getTopLevelPages } from './pages';
import { QUERY_ALL_MENUS } from '../data/menus';

export const MENU_LOCATION_NAVIGATION_DEFAULT = 'DEFAULT_NAVIGATION';

/**
 * getAllMenus
 */

export async function getAllMenus() {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: QUERY_ALL_MENUS,
  });

  const menus = data?.data.menus.edges.map(mapMenuData);

  const defaultNavigation = createMenuFromPages({
    locations: [MENU_LOCATION_NAVIGATION_DEFAULT],
    pages: await getTopLevelPages({
      queryIncludes: 'index',
    }),
  });

  menus.push(defaultNavigation);

  return {
    menus,
  };
}

/**
 * mapMenuData
 */

export function mapMenuData(menu = {}) {
  const { node }: any = menu;
  const data = { ...node };

  data.menuItems = data.menuItems.edges.map(({ node }: any) => {
    return { ...node };
  });

  return data;
}

/**
 * mapPagesToMenuItems
 */

export function mapPagesToMenuItems(pages: any) {
  return pages.map(({ id, uri, title }: any) => {
    return {
      label: title,
      path: uri,
      id,
    };
  });
}

/**
 * createMenuFromPages
 */

export function createMenuFromPages({ locations, pages }: any) {
  return {
    menuItems: mapPagesToMenuItems(pages),
    locations,
  };
}

/**
 * parseHierarchicalMenu
 */
export const parseHierarchicalMenu = (
  data = [],
  { idKey = 'id', parentKey = 'parentId', childrenKey = 'children' } = {}
) => {
  const tree: Array<any> = [];
  const childrenOf: any = {};

  data.forEach((item: any) => {
    const newItem = { ...item };
    const { [idKey]: id, [parentKey]: parentId = 0 } = newItem;
    childrenOf[id] = childrenOf[id] || [];
    newItem[childrenKey] = childrenOf[id];
    parentId ? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem) : tree.push(newItem);
  });
  return tree;
};

/**
 * findMenuByLocation
 */

export function findMenuByLocation(menus: any, location: any) {
  if (typeof location !== 'string') {
    throw new Error('Failed to find menu by location - location is not a string.');
  }

  const menu = menus.find(({ locations }: any) => {
    return locations.map((loc: any) => loc.toUpperCase()).includes(location.toUpperCase());
  });

  return menu && parseHierarchicalMenu(menu.menuItems);
}
