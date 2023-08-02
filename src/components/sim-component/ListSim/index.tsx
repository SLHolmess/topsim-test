import { ArrowDownIcon, ArrowUpIcon, Menu, Popover } from "evergreen-ui";
import SimItem from "../SimItem";
import { convertQueryParamsToObject } from "src/constants/shared";

const ListSim = (props: any) => {
  const { type, pathname, searchParams, dataSim } = props;

  const paramObj = convertQueryParamsToObject(
    new URLSearchParams(searchParams)
  );

  //* state

  const crumbs = dataSim?.[type]?.crumbs || [];
  const title = dataSim?.[type]?.title || "";

  const totalSim = dataSim?.[type]?.totalSim || 0;
  const listSim = dataSim?.[type]?.listSim || [];

  function updateSearchParams(
    searchParams: URLSearchParams,
    type: string
  ): URLSearchParams {
    if (searchParams) {
      const sortByParam = searchParams.get("sortBy");
      const directionParam = searchParams.get("direction");

      if (sortByParam && directionParam) {
        // Đã tồn tại cả "sortBy" và "direction"
        searchParams.set("sortBy", "price");
        searchParams.set("direction", type);
      } else {
        // Một trong hai hoặc cả hai không tồn tại
        searchParams.set("sortBy", "price");
        searchParams.set("direction", type);
      }
    } else {
      // Không tồn tại searchParams, tạo mới
      const newSearchParams = new URLSearchParams();
      newSearchParams.set("sortBy", "price");
      newSearchParams.set("direction", type);

      // Gán searchParams với giá trị mới
      searchParams = newSearchParams;
    }

    return searchParams;
  }

  //* handler
  return (
    <>
      <div className="mt-3">
        {listSim && listSim.length > 0 && (
          <div className="flex justify-between items-center mb-2">
            <div className="flex gap-2">
              <a
                href={`${pathname}?${updateSearchParams(
                  new URLSearchParams(searchParams),
                  "1"
                )}`}
                style={
                  paramObj && paramObj.direction === "1"
                    ? { backgroundColor: "#0039a1", color: "#ffffff" }
                    : {}
                }
                className="whitespace-nowrap flex cursor-pointer items-center gap-1 text-[13px] bg-white text-[#0039a1] hover:text-white hover:bg-[#0039a1] px-3 py-1 rounded border border-[#0039a1]"
              >
                Giá tăng dần
              </a>
              <a
                href={`${pathname}?${updateSearchParams(
                  new URLSearchParams(searchParams),
                  "-1"
                )}`}
                style={
                  paramObj && paramObj.direction === "-1"
                    ? { backgroundColor: "#0039a1", color: "#ffffff" }
                    : {}
                }
                className="whitespace-nowrap flex cursor-pointer items-center gap-1 text-[13px] bg-white text-[#0039a1] hover:text-white hover:bg-[#0039a1] px-3 py-1 rounded border border-[#0039a1]"
              >
                Giá giảm dần
              </a>
            </div>
            <div className="text-sm" style={{ color: "#0039a1" }}>
              Số lượng {totalSim}
            </div>
          </div>
        )}
        <div className="flex flex-col">
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-5">
            {listSim.length > 0 ? (
              listSim.map((item: any) => <SimItem key={item?.id} sim={item} />)
            ) : (
              <div className="text-center italic text-semibold text-slate-700 col-span-3 md:col-span-2 xl:col-span-3">
                Không có sim để hiển thị
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListSim;
