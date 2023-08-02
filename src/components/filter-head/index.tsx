import * as React from "react";
import BreadCrumbs from "../breadcrumbs";
import {
  filterHead,
  filterTel,
  filterPrice,
  filterTypes,
  filterPhongThuy,
  filterHighLevel,
  filterImpressive,
  filterPopularKeyword,
} from "../../constants/config";
import {
  convertQueryParamsToObject,
  filterEmptyValues,
  renderLogo,
  renderLogoTelUrl,
} from "../../constants/shared";

const HeaderFilter = (props: any) => {
  const { dataContentSeo } = props;

  const pathname = typeof window !== "undefined" && window.location.pathname;
  const baseUrl = typeof window !== "undefined" && window.location.origin;
  const param = typeof window !== "undefined" && window.location.search;

  const paramObj = param
    ? convertQueryParamsToObject(new URLSearchParams(param))
    : {};

  const [itemChecked, setItemChecked] = React.useState<any>([]);
  const [isShowSave, setIsShowSave] = React.useState(false);
  const [params, setParams] = React.useState<any>({});
  const [filterPriceCustom, setFilterPriceCustom] = React.useState(filterPrice);

  const idItemChecked = itemChecked.map((i: any) => i?.id);

  const filterDefault: any = [
    ...filterHead,
    ...filterTel,
    ...filterPrice,
    ...filterTypes,
    ...filterPhongThuy,
    ...filterHighLevel,
    ...filterImpressive,
    ...filterPopularKeyword,
  ].find((item) => item.link === pathname);

  const handleDefault = () => {
    let defaultChecked = [];

    if (filterDefault) defaultChecked.push(filterDefault);
    if (paramObj.t) {
      const item = filterTel.find((item) => item.svId === paramObj.t);
      defaultChecked.push(item);
    }
    if (paramObj.head) {
      const item = filterHead.find((item) => item.head === paramObj.head);
      defaultChecked.push(item);
    }
    if (paramObj.gte) {
      const item = filterPriceCustom?.find(
        (item) => item?.gte === paramObj.gte
      );
      defaultChecked.push(item);
    }
    if (paramObj.catId) {
      const item = filterTypes.find((item) => item.catId === paramObj.catId);
      defaultChecked.push(item);
    }

    setItemChecked(defaultChecked);
  };

  React.useEffect(() => {
    const items = [...itemChecked];

    const newItems = items.filter((i) => !i.gte);

    if (paramObj.gte) {
      const item = filterPriceCustom?.find(
        (item) => item?.gte === paramObj.gte
      );
      newItems.push(item);
      setItemChecked(newItems);
    } else {
      setItemChecked(newItems);
    }
  }, []);

  const handleClickItem = (key: string, value: any) => {
    setIsShowSave(true);

    switch (key) {
      case "head":
        setItemChecked((prev: any) => {
          if (idItemChecked.includes(value.id)) {
            const newChecked = itemChecked.filter(
              (i: any) => i.id !== value.id
            );
            return newChecked;
          } else {
            const newChecked = itemChecked.filter((i: any) => !i.head);
            return [...newChecked, value];
          }
        });
        break;
      case "tel":
        setItemChecked((prev: any) => {
          if (idItemChecked.includes(value.id)) {
            const newChecked = itemChecked.filter(
              (i: any) => i.id !== value.id
            );
            return newChecked;
          } else {
            const newChecked = itemChecked.filter((i: any) => !i.telco);
            return [...newChecked, value];
          }
        });
        break;
      case "price":
        setItemChecked((prev: any) => {
          if (idItemChecked.includes(value.id)) {
            const newChecked = itemChecked.filter(
              (i: any) => i.id !== value.id
            );
            return newChecked;
          } else {
            const newChecked = itemChecked.filter((i: any) => !i.gte);
            return [...newChecked, value];
          }
        });
        break;
      case "type":
        setItemChecked((prev: any) => {
          if (idItemChecked.includes(value.id)) {
            const newChecked = itemChecked.filter(
              (i: any) => i.id !== value.id
            );
            return newChecked;
          } else {
            const newChecked = itemChecked.filter((i: any) => !i.catId);
            return [...newChecked, value];
          }
        });
        break;
      default:
        break;
    }
  };

  const handleChangeFilter = () => {
    let t: string = "",
      head: string = "",
      gte: string = "",
      lte: string = "",
      catId: string = "";

    itemChecked.forEach((ele: any) => {
      if (ele.head) {
        head = ele.head;
      }

      if (ele.telco) {
        t = ele.svId;
      }

      if (ele.gte) {
        gte = ele.gte;
        lte = ele.lte;
      }

      if (ele.catId) {
        catId = ele.catId;
      }
    });

    setParams({
      head,
      t,
      gte,
      lte,
      catId,
    });
  };

  const handleCustomPrice = () => {
    const cateItem: any | undefined = itemChecked.find(
      (item: any) => item.catId
    );
    if (cateItem) {
      if (
        cateItem.catId === "68" ||
        cateItem.catId === "103" ||
        cateItem.catId === "104"
      ) {
        const newArr = filterPrice.slice(4);
        newArr.unshift({
          id: "0",
          label: "Dưới 5 triệu",
          category: 1,
          link: "/sim-gia-duoi-5-trieu",
          gte: "0",
          lte: "5000000",
        });
        setFilterPriceCustom(newArr);
      } else if (cateItem.catId === "99" || cateItem.catId === "105") {
        const newArr = filterPrice.slice(5);
        newArr.unshift({
          id: "0",
          label: "Dưới 10 triệu",
          category: 1,
          link: "/sim-gia-duoi-10-trieu",
          gte: "0",
          lte: "10000000",
        });
        setFilterPriceCustom(newArr);
      } else if (cateItem.catId === "100") {
        const newArr = filterPrice.slice(7);
        newArr.unshift({
          id: "0",
          label: "Dưới 50 triệu",
          category: 1,
          link: "/sim-gia-duoi-10-trieu",
          gte: "0",
          lte: "50000000",
        });
        setFilterPriceCustom(newArr);
      } else {
        setFilterPriceCustom(filterPrice);
      }
    } else {
      setFilterPriceCustom(filterPrice);
    }
  };

  const handleSave = () => {
    const paramSubmit = filterEmptyValues(params);
    let pathRoute = "";

    const hasHead = itemChecked.findIndex((i: any) => i.head) !== -1;
    const hasTel = itemChecked.findIndex((i: any) => i.telco) !== -1;
    const hasPrice = itemChecked.findIndex((i: any) => i.gte) !== -1;
    const hasCate = itemChecked.findIndex((i: any) => i.catId) !== -1;

    if (
      filterDefault?.catId &&
      itemChecked.findIndex((i: any) => i.catId) !== -1
    ) {
      const item = itemChecked.find((i: any) => i.catId);
      delete paramSubmit.catId;
      pathRoute = item.link;
    } else if (hasTel === true && hasPrice === true) {
      const item = itemChecked.find((i: any) => i.telco);
      delete paramSubmit.t;
      pathRoute = item.link;
    } else if (hasTel === true) {
      const item = itemChecked.find((i: any) => i.telco);
      delete paramSubmit.t;
      pathRoute = item.link;
    } else if (hasCate === true) {
      const item = itemChecked.find((i: any) => i.catId);
      delete paramSubmit.catId;
      pathRoute = item.link;
    } else if (hasHead === true) {
      const item = itemChecked.find((i: any) => i.head);
      delete paramSubmit.head;
      pathRoute = item.link;
    } else if (hasPrice === true) {
      const item = itemChecked.find((i: any) => i.gte);
      delete paramSubmit.lte;
      delete paramSubmit.gte;
      pathRoute = item.link;
    } else {
      setIsShowSave(false);
    }

    const paramConverted = new URLSearchParams(paramSubmit).toString();
    const url = `${baseUrl}${pathRoute}${
      paramConverted ? `?${paramConverted}` : ""
    }`;
    if (typeof window !== "undefined") {
      window.location.href = url;
    }
  };

  const handleCancel = () => {
    handleDefault();
    setIsShowSave(false);
  };

  React.useEffect(() => {
    handleDefault();
  }, []);

  React.useEffect(() => {
    handleChangeFilter();
    handleCustomPrice();
  }, [itemChecked]);

  // React.useEffect(() => {
  //   if (pathname !== "/" && !filterDefault) {
  //     window.location.href = "/404"
  //   }
  // }, [])

  const renderCrumb = () => {
    if (filterDefault?.telco) {
      return filterDefault.label;
    }
    if (filterDefault?.gte) {
      return `Sim giá ${filterDefault?.label}`;
    }
    if (filterDefault?.catId) {
      return `Sim ${filterDefault?.label}`;
    }
    if (filterDefault?.head) {
      return `Sim đầu số ${filterDefault?.head}`;
    } else return "";
  };

  return (
    <div className="relative mb-10">
      <div>
        <BreadCrumbs crumbs={renderCrumb()} />
        <h1 className="font-semibold text-lg md:text-2xl mb-[20px]">
          {dataContentSeo?.h1 || "Sim số đẹp"}
        </h1>
      </div>
      <div className="overflow-x-auto">
        <div className="mb-2 whitespace-nowrap md:whitespace-normal">
          {filterHead.map((item) => (
            <div
              onClick={() => handleClickItem("head", item)}
              key={item.id}
              className="inline-block cursor-pointer"
            >
              <div
                className={`bg-white px-3 py-1 mr-2 font-bold text-[#009900] border rounded-[6px] ${
                  idItemChecked.includes(item.id) ? "button-filter-active" : ""
                }`}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
        <div className="mb-2 whitespace-nowrap md:whitespace-normal">
          {filterTel.map((item) => (
            <div
              onClick={() => handleClickItem("tel", item)}
              key={item.id}
              className={`inline-block bg-white px-3 py-1 mr-2 font-bold  border rounded-[6px] cursor-pointer ${
                idItemChecked.includes(item.id) ? "button-filter-active" : ""
              }`}
            >
              <div
                className="w-[49px] h-[25px]"
                style={{
                  backgroundImage: `url(${renderLogoTelUrl(item.telco)})`,
                  backgroundSize: item.telco === "itelecom" ? "60%" : "100%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                }}
              />
            </div>
          ))}
        </div>
        <div className="mb-2 whitespace-nowrap md:whitespace-normal">
          {filterPriceCustom.map((item) => (
            <div
              onClick={() => handleClickItem("price", item)}
              key={item.id}
              className="inline-block cursor-pointer"
            >
              <div
                className={`bg-white px-4 py-2 mr-2 md:mb-2 text-[13.5px] border rounded-[6px] ${
                  idItemChecked.includes(item.id) ? "button-filter-active" : ""
                }`}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
        <div className="mb-2 whitespace-nowrap md:whitespace-normal">
          {filterTypes.map((item) => (
            <div
              onClick={() => handleClickItem("type", item)}
              key={item.id}
              className="inline-block cursor-pointer"
            >
              <div
                className={`bg-white px-4 py-2 mr-2 md:mb-2 text-[13.5px] border rounded-[6px] font-[600] ${
                  idItemChecked.includes(item.id) ? "button-filter-active" : ""
                }`}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
        {isShowSave === true && (
          <div className="flex justify-end absolute right-0">
            <button
              onClick={handleSave}
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center mr-2 mb-2"
            >
              Áp dụng
            </button>
            <button
              onClick={handleCancel}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              <span className="relative px-5 py-1 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                Hủy
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderFilter;
