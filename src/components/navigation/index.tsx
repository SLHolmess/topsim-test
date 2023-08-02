import logo from "src/assets/images/logo";
import { HEAD_NUMBER } from "../../constants/config";
import SimService from "../../service/sim";
import { toaster } from "evergreen-ui";
import React from "react";

const NavigationView = (props: any) => {
  const { urlActive } = props;

  const [keyword, setKeyword] = React.useState("");
  const [dataSearch, setDataSearch] = React.useState<any>();
  const [loading, setLoading] = React.useState(false);

  const handleRedirect = (href: string) => {
    const location = typeof window !== "undefined" && window.location;
    if (dataSearch.data.redirect === false) {
      return;
    } else {
      if (location) {
        location.href = `/${href}`;
      } else return;
    }
  };

  const handleClickSearch = async () => {
    setLoading(true);
    const params = {
      keyword: keyword,
      link: urlActive,
    };
    const res = await SimService.getSearch(params);

    if (res.success) setDataSearch(res);
    else toaster.danger("Đã xảy ra lỗi trong quá trình gửi yêu cầu, vui lòng thử lại");
    setLoading(false);
  };

  const handlePressKey = (event: any) => {
    if (event.key === "Enter") {
      handleClickSearch();
    }
  };

  React.useEffect(() => {
    if (dataSearch && dataSearch.data?.redirectUrl) {
      handleRedirect(dataSearch.data?.redirectUrl);
    }
    setLoading(false);
  }, [dataSearch]);

  return (
    <>
      <nav className="bg-blue-400 border-gray-200 dark:bg-gray-900 nav-desktop px-1">
        <div className="flex flex-wrap justify-between items-center mx-auto py-2.5 md:w-12/12 xl:w-9/12 2xl:w-8/12 h-16">
          <a href="/" className="flex items-center">
            <img alt="sim.vn" src={logo.mainLogo} width={150} />
          </a>
          <div className="relative hidden md:flex w-4/12">
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
              maxLength={12}
              id="search-navbar"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-l-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Nhập số Sim bạn muốn tìm"
              onKeyDown={handlePressKey}
              // value={valueSearch}
              onChange={(e: any) => setKeyword(e.target.value.toString())}
            />
            <button
              onClick={handleClickSearch}
              className={`${
                loading === true ? "bg-blue-500" : "bg-blue-600"
              } rounded-r-lg w-40 text-white flex justify-center items-center`}
              disabled={loading}
            >
              {loading === true ? (
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-500"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              ) : (
                "Tìm kiếm"
              )}
            </button>
          </div>
          <div className="flex items-center">
            <a
              href="/lien-he"
              className="text-sm font-medium text-white hover:underline"
            >
              Giới thiệu về sim.vn
            </a>
          </div>
        </div>
      </nav>
      <nav className="bg-gray-200 dark:bg-gray-700 mb-4 nav-desktop">
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
                  href="/bai-viet/"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Tin tức
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Mobile */}
      <nav className="py-3 border-gray-200 bg-blue-400 px-2">
        <div className="justify-start">
          <a href="/" className="flex items-center">
            {/* <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-6 mr-3 sm:h-10"
              alt="Flowbite Logo"
            /> */}
            <img alt="sim.vn" src={logo.mainLogo} width={150} />
          </a>
        </div>
      </nav>
    </>
  );
};

export default NavigationView;
