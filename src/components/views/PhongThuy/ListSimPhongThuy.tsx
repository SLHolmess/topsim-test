import { parserHtmlToReact, renderLogo, renderPrice } from "../../../constants/shared";
import moment from "moment";
import React from "react";

const ListSimPhongThuy = (props: any) => {
  const { dataSim, searchParams } = props;

  const listSim = dataSim?.lists || [];

  const params = Object.fromEntries(searchParams.entries());

  return (
    <div>
      {params.birth_date && (
        <div className="uppercase font-bold py-2 border-b-2 border-slate-400 mb-3">
          Tổng quan ưu, khuyết điểm của mệnh chủ{" "}
          {moment(params?.birth_date).format("DD/MM/YYYY")}
        </div>
      )}
      <div>
        {dataSim &&
          dataSim?.menh_chu?.map((content: string) => (
            <div>{parserHtmlToReact(content)}</div>
          ))}
      </div>
      {params.birth_date && (
        <div className="uppercase font-bold py-2 border-b-2 border-slate-400 mb-3 mt-5">
          Sim hợp tuổi {moment(params?.birth_date).format("DD/MM/YYYY")}
        </div>
      )}
      <div>
        {listSim.map((sim: any) => (
          <div className="border-b-2">
            <div className="flex justify-between items-center">
              <div className="font-bold text-sky-600 text-lg">{sim.sim}</div>
              <div className="border rounded-lg md:px-3 md:mr-4 my-2 bg-white cursor-pointer flex flex-row justify-center items-center md:h-12 mobile-logo-icon">
                {renderLogo(sim?.telco?.toLowerCase())}
              </div>
            </div>
            <div className="mb-2">Điểm phong thủy: {sim.diem}</div>
            <div className="mb-2">
              <span className="font-semibold">Giá:</span>{" "}
              {renderPrice(sim.giaban)}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Diễn giải:</span>
              {sim?.dien_giai?.map((content: string) => (
                <div>{parserHtmlToReact(content)}</div>
              ))}
            </div>
            <div>
              <a
                href={`/xem-phong-thuy?sim=${sim.sim}&birth_date=${params.birth_date}&birth_time=${params.birth_time}&sex=${params.sex}`}
                className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-800 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                <span className="relative px-5 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Xem luận giải
                </span>
              </a>
              <a
                href={`/${sim.sim}`}
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2"
              >
                Đặt mua sim
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListSimPhongThuy;
