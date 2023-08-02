import * as React from "react";
import ButtonPhongThuyFilter from "../buttons/ButtonPhongThuy";
import { filterPhongThuy } from "src/constants/config";

const PhongThuyFilter = () => {

  return (
    <>
      <div className="font-semibold">SIM HỢP MỆNH</div>
      <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-3 mt-4">
        {filterPhongThuy.map((tel: any) => (
          <ButtonPhongThuyFilter
            key={tel.id}
            icon={tel.icon}
            label={tel.label}
            link={tel.link}
          />
        ))}
      </div>
    </>
  );
};

export default PhongThuyFilter;
