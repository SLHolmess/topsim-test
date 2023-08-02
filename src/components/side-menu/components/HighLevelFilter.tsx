import * as React from "react";
import ButtonLevelFilter from "../buttons/ButtonLevel";
import { filterHighLevel } from "src/constants/config";

const HighLevelFilter = () => {
  
  return (
    <>
      <div className="font-semibold">SIM THỂ HIỆN ĐẲNG CẤP</div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3 my-5">
        {filterHighLevel.map((item: any) => (
          <ButtonLevelFilter
            key={item.id}
            title={item?.title}
            label={item.label}
            link={item.link}
          />
        ))}
      </div>
    </>
  );
};

export default HighLevelFilter;
