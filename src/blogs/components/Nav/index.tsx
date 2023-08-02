import { useEffect, useRef, useState, useCallback } from "react";
import {
  findMenuByLocation,
  MENU_LOCATION_NAVIGATION_DEFAULT,
} from "../../lib/menus";

import classes from "./Nav.module.scss";
import logo from "src/assets/images/logo";
import { config } from "src/blogs/lib/util";
import "./nav.css"

const SEARCH_VISIBLE = "visible";
const SEARCH_HIDDEN = "hidden";

const Nav = (props: any) => {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const { menus, searchData } = props;
  const formRef = useRef<any>();
  const maxResults = 5;

  const [searchVisibility, setSearchVisibility] = useState(SEARCH_VISIBLE);

  // const { title } = metadata;
  const title = "Tam"; // Tam thoi sua sau

  const navigationLocation =
    import.meta.env.WORDPRESS_MENU_LOCATION_NAVIGATION ||
    MENU_LOCATION_NAVIGATION_DEFAULT;
  const navigation = findMenuByLocation(menus, navigationLocation);



  return (
    <>
      {/* <nav className={styles.nav}>
      <Section className={styles.navSection}>
        <div className={styles.navContainer}>
          <div className={styles.headerContainer}>
            <div className={styles.navName}>
              <a href="https://sim.vn">
                <a>
                  <img
                    src={`https://sim.vn/logo.png`}
                    alt={title}
                    width={164}
                    height={40}
                  />
                </a>
              </a>
            </div>
            <div className={styles.navNameMobile}>
              <a href="/">
                <a>
                  <img
                    src={`/home-icon.png`}
                    alt={title}
                    width={54}
                    height={44}
                  />
                </a>
              </a>
            </div>
            <ul className={styles.navMenu}>
              {navigation?.map((listItem: any) => {
                return (
                  <NavListItem
                    key={listItem.id}
                    className={styles.navSubMenu}
                    item={listItem}
                  />
                );
              })}
            </ul>
            <div className={styles.navSearch}>
              <div className={styles.searchForm}>
                <form
                  ref={formRef}
                  action="/search"
                  data-search-is-active={!!query}
                >
                  <input
                    type="text"
                    name="q"
                    id="input_search"
                    value={query || ""}
                    onChange={(e) => handleOnSearch(e)}
                    autoComplete="off"
                    placeholder="Tìm sim trên Sim.vn"
                    required
                  />
                  <div className={styles.navSearchResults}>
                    {results.length > 0 && (
                      <ul>
                        {results.map((item: any, index) => {
                          return (
                            <li key={item.node.slug}>
                              <a
                                tabIndex={index}
                                href={postPathBySlug(item.node.slug)}
                              >
                                <a>{item.node.title}</a>
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                    {results.length === 0 && (
                      <p>
                        Sorry, not finding anything for <strong>{query}</strong>
                      </p>
                    )}
                  </div>
                  <button type="submit" className={styles.searchFormButton}>
                    <i className="icon icon-search"></i>Tìm Kiếm
                  </button>
                </form>
              </div>
            </div>
            <div className={styles.labelCol}>
              <a href="https://sim.vn/lien-he" className={styles.headera}>
                Giới thiệu về sim.vn
              </a>
            </div>
          </div>
        </div>
      </Section>
    </nav> */}
      <nav className="bg-blue-400 border-gray-200 dark:bg-gray-900 navDesktop px-3 md:px-0">
        <div className="flex flex-wrap justify-between items-center mx-auto py-2.5 md:w-12/12 xl:w-9/12 2xl:w-8/12 h-16">
          <a href="/" className="flex items-center">
            <img alt="sim.vn" src={logo.mainLogo} width={150} />
          </a>
          <div className="relative md:flex w-4/12 wr-s">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input
              type="text"
              // maxLength={12}
              id="search-navbar"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-l-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Nhập nội dung tin tức muốn tìm"
              // onKeyDown={handlePressKey}
              // value={valueSearch}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={() => { if(search) window.location.replace(`${config.homepage}/bai-viet?search=${search}`) }}
              className="bg-blue-600 rounded-r-lg w-40 text-white flex justify-center items-center"
            >
              Tìm kiếm
            </button>
          </div>
          <div className="flex items-center gt-s">
            <a
              href="/lien-he"
              className="text-sm font-medium text-white hover:underline"
            >
              Giới thiệu về Sim.vn
            </a>
          </div>
        </div>
      </nav>
      <div className={`${classes.navDesktop}`}>
        <nav className={`bg-gray-200 dark:bg-gray-700 mb-4`}>
          <div className="py-3 mx-auto md:w-12/12 xl:w-9/12 2xl:w-8/12 md:text-sm xl:text-base">
            <div className="flex items-center justify-start">
              <ul className="flex flex-row mt-0 mr-6 space-x-8 text-md font-medium">
                <li>
                  <a
                    href="/"
                    className="text-gray-900 dark:text-white hover:underline"
                    aria-current="page"
                  >
                    Trang chủ
                  </a>
                </li>
                <li>
                  <a
                    href="/dinh-gia-sim"
                    className="text-gray-900 dark:text-white hover:underline"
                  >
                    Định giá SIM
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-900 dark:text-white hover:underline"
                  >
                    Cầm cố / thu mua
                  </a>
                </li>
                <li>
                  <a
                    href="/sim-nam-sinh"
                    className="text-gray-900 dark:text-white hover:underline"
                  >
                    Sim năm sinh
                  </a>
                </li>
                <li>
                  <a
                    href="/sim-phong-thuy"
                    className="text-gray-900 dark:text-white hover:underline"
                  >
                    Sim phong thủy
                  </a>
                </li>
                <li>
                  <a
                    href="/dat-sim-theo-yeu-cau"
                    className="text-gray-900 dark:text-white hover:underline"
                  >
                    Đặt sim theo yêu cầu
                  </a>
                </li>
                <li>
                  <a
                    href="/bai-viet"
                    className="text-gray-900 dark:text-white hover:underline"
                  >
                    Tin tức
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Nav;
