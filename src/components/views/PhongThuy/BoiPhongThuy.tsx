import { parserHtmlToReact } from "../../../constants/shared";
import React from "react";

const BoiPhongThuy = (props: any) => {
  const { dataPhongThuy } = props;

  const luanGiai = dataPhongThuy?.luan_giai;

  return (
    <div className="border bg-white p-5">
      <div className="font-bold mb-2 text-lg">{luanGiai.title}</div>
      <div className="mb-2">
        {luanGiai?.top?.map((content: string) => (
          <div key={content}>{parserHtmlToReact(content)}</div>
        ))}
      </div>

      {/* Mệnh chủ */}
      <div className="text-lg font-semibold">{luanGiai.menh_chu.title}</div>
      <div className="mb-2">
        {luanGiai.menh_chu.text.map((ct: string) => (
          <div key={ct}>{parserHtmlToReact(ct)}</div>
        ))}
      </div>

      {/* Sinh khí */}
      <div className="text-lg font-semibold">{luanGiai.sinh_khi.title}</div>
      <div className="mb-2">
        {luanGiai.sinh_khi.text.map((ct: string) => (
          <div key={ct}>{parserHtmlToReact(ct)}</div>
        ))}
      </div>

      {/* Du niên */}
      <div className="text-lg font-semibold">{luanGiai.du_nien.title}</div>
      <div className="mb-2">
        {luanGiai.du_nien.text.map((ct: string) => (
          <div key={ct}>{parserHtmlToReact(ct)}</div>
        ))}
      </div>

      {/* Âm Dương */}
      <div className="text-lg font-semibold">{luanGiai.am_duong.title}</div>
      <div className="mb-2">
        {luanGiai.am_duong.top.map((ct: string) => (
          <div key={ct}>{parserHtmlToReact(ct)}</div>
        ))}
      </div>
      <div className="mb-2 grid grid-cols-10">
        {luanGiai.am_duong.number.map((i: any) => (
          <div className="flex flex-col" key={i.number}>
            <div
              className="flex justify-center items-center border-x-2 border-b-2"
              style={{ height: "46px", backgroundColor: `${i.color}` }}
            >
              {i.number}
            </div>
            <div
              className="flex justify-center items-center border-x-2"
              style={{ height: "46px", backgroundColor: `${i.color}` }}
            >
              {i.text}
            </div>
          </div>
        ))}
      </div>
      <div className="mb-2">
        {luanGiai.am_duong.text.map((ct: string) => (
          <div key={ct}>{parserHtmlToReact(ct)}</div>
        ))}
      </div>

      {/* Ngũ hành */}
      <div className="text-lg font-semibold">{luanGiai.ngu_hanh.title}</div>
      <div className="mb-2">
        {luanGiai.ngu_hanh.text.map((ct: string) => (
          <div key={ct}>{parserHtmlToReact(ct)}</div>
        ))}
      </div>

      {/* Quẻ dịch */}
      <div className="text-lg font-semibold">{luanGiai.que_dich.title}</div>
      <div className="mb-2">
        {luanGiai.que_dich.text.map((ct: string) => (
          <div key={ct}>{parserHtmlToReact(ct)}</div>
        ))}
      </div>

      {/* Bát tự */}
      <div className="text-lg font-semibold">{luanGiai.bat_tu.title}</div>
      <img
        src={`data:image/png;base64,${luanGiai.bat_tu.image}`}
        alt="bát tự simvn"
      />
      <div className="mb-2">{parserHtmlToReact(luanGiai.end.text)}</div>

      {/* Chấm điểm */}
      <div className="mt-3 text-center cham-diem-sim">
        {parserHtmlToReact(dataPhongThuy?.sim?.title)}
      </div>
      <div className="text-center mt-4">
        <button
          type="button"
          className="text-white font-bold uppercase border-4 border-orange-300 bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 rounded-full text-lg px-5 py-2.5 text-center mr-2 mb-2"
        >
          Tổng điểm: {dataPhongThuy?.sim?.diem}/10
        </button>
      </div>
    </div>
  );
};

export default BoiPhongThuy;
