import React from "react";
import { filterPopularKeyword } from "src/constants/config";

const PopularKeyword = (props: any) => {
  const popularKeyword = filterPopularKeyword;

  return (
    <>
      <div className="font-semibold mb-2">TỪ KHÓA PHỔ BIẾN</div>
      <div className="w-full inline-block ">
        {popularKeyword.map((item: any) => (
          <div key={item.id} className="mr-2 my-1 text-center break-words py-1 px-1 font-semibold float-left">
            <a
              className="text-orange-700 text-base"
              href={item.link}
            >
              {item?.label}
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default PopularKeyword;
