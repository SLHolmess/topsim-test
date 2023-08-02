import InputField from "../helpers/InputField";
import Modal from "../helpers/Modal";
import { filterHighLevel, filterImpressive } from "../../constants/config";
import SimService from "../../service/sim";
import { Button, CrossIcon, Li, Popover, SearchIcon, toaster, Ul } from "evergreen-ui";
import React from "react";

const SearchPopover = (props: any) => {

  const { urlActive } = props;

  const [isShown, setIsShown] = React.useState(false);
  const [keyword, setKeyword] = React.useState("");
  const [dataSearch, setDataSearch] = React.useState<any>();
  const [loading, setLoading] = React.useState(false);


  const toggleShown = () => {
    setIsShown(!isShown);
  };

  const handleRedirect = (href: string) => {
    const location = typeof window !== "undefined" && window.location;
    if (dataSearch?.data.redirect === false) {
      return;
    } else {
      if (location) {
        location.href = `/${href}`;
      } else return;
    }
    setLoading(false);
  };

  const handleClickSearch = async () => {
    setLoading(true);
    const params = {
      keyword: keyword,
      link: urlActive,
    };
    const res = await SimService.getSearch(params);

    if (res.success) setDataSearch(res);
    else toaster.danger("Đã xảy ra lỗi trong quá trình gửi yêu cầu, vui lòng thử lại!");
  };

  React.useEffect(() => {
    if (dataSearch && dataSearch?.data?.redirectUrl) {
      handleRedirect(dataSearch?.data?.redirectUrl);
    }
    setLoading(false);
  }, [dataSearch]);

  return (
    <div>
      {/* <Popover
        bringFocusInside
        position="top"
        trigger="click"
        isShown={isShown}
        content={
          <div className="m-auto pl-4 h-screen w-screen">
            <div className="flex justify-end mb-2">
              <Button onClick={toggleShown}>
                <CrossIcon /> Đóng
              </Button>
            </div>
            <hr />
            <div className="flex gap-2 mt-3 mb-3 w-full">
              <div className="w-9/12">
                <InputField onChange={(value: any) => setKeyword(value.toString())}/>
              </div>
              <button onClick={handleClickSearch} className="bg-blue-600 rounded-lg text-white text-xs px-3">
                Tìm kiếm
              </button>
            </div>
            <div>
              <div className="font-semibold uppercase">Tìm kiếm sim</div>
              <Ul className="list-disc">
                <Li>Tìm sim có 6789 hãy gõ 6789</Li>
                <Li>Tìm sim có đầu 090 đuôi 8888 hãy gõ 090*8888</Li>
                <Li>Tìm sim bắt đầu bằng 0914 đuôi bất kỳ, hãy gõ: 0914*</Li>
              </Ul>
              <div className="mt-2 mb-1 font-semibold uppercase">
                Tìm kiếm nổi bật
              </div>
              <div className="w-full">
                {[...filterHighLevel, ...filterImpressive].map(
                  (item: any) => (
                    <div key={item.id} className="p-1 float-left w-1/2">
                      <a
                        href={item.link}
                        className="mobile-button-filter-price"
                      >
                        {item?.label}
                      </a>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        }
      >
        <div></div>
      </Popover> */}
      <Modal
        isShowing={isShown}
        hide={toggleShown}
      >
        <hr />
        <div className="m-auto px-4 w-full">
            <div className="flex gap-2 mt-3 mb-3 w-full">
              <div className="w-9/12">
                <InputField type="tel" onChange={(value: any) => setKeyword(value.toString())}/>
              </div>
              <button onClick={handleClickSearch} className="bg-blue-600 rounded-lg text-white text-xs px-3">
                Tìm kiếm
              </button>
            </div>
            <div>
              <div className="font-semibold uppercase">Tìm kiếm sim</div>
              <Ul className="list-disc">
                <Li>Tìm sim có 6789 hãy gõ 6789</Li>
                <Li>Tìm sim có đầu 090 đuôi 8888 hãy gõ 090*8888</Li>
                <Li>Tìm sim bắt đầu bằng 0914 đuôi bất kỳ, hãy gõ: 0914*</Li>
              </Ul>
              <div className="mt-2 mb-1 font-semibold uppercase">
                Tìm kiếm nổi bật
              </div>
              <div className="">
                {[...filterHighLevel, ...filterImpressive].map(
                  (item: any) => (
                    <div key={item.id} className="p-1 float-left w-1/2 mb-1">
                      <a
                        href={item.link}
                        className="mobile-button-filter-price"
                      >
                        {item?.label}
                      </a>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
      </Modal>
      <div className="bottom-nav-link" onClick={toggleShown}>
        <SearchIcon />
        <span>Tìm sim</span>
      </div>
    </div>
  );
};

export default SearchPopover;
