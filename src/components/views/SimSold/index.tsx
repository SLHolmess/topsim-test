import React from "react";
import Card from "src/components/helpers/Card/Card";
import SimItem from "src/components/sim-component/SimItem";
import {
  gMobileHead,
  iTelHead,
  mobifoneHead,
  vietnamobileHead,
  viettelHead,
  vinaphoneHead,
} from "src/constants/config";
import { renderLogoTelUrl } from "src/constants/shared";
import SimCLService from "src/helpers/client/services/sim-cl";

const SimSold = (props: any) => {
  const { simNumber } = props;

  const [dataSuggest, setDataSuggest] = React.useState<any>([]);

  const filterOptions = {
    tail: simNumber?.slice(6, 10),
    type: "search",
    link: "/",
    // limit: "12",
  };

  const telCheck = () => {
    if (viettelHead.test(simNumber || "")) return "viettel";
    if (vinaphoneHead.test(simNumber || "")) return "vinaphone";
    if (mobifoneHead.test(simNumber || "")) return "mobifone";
    if (vietnamobileHead.test(simNumber || "")) return "vietnamobile";
    if (gMobileHead.test(simNumber || "")) return "gmobile";
    if (iTelHead.test(simNumber || "")) return "itelecom";
    return "";
  };

  const handleDataSuggest = async () => {
    const data = await SimCLService.getSimClient(filterOptions);

    if (data.success) {
      setDataSuggest(data.data?.search?.listSim);
    } else setDataSuggest([]);
  };

  const tel = telCheck();

  React.useEffect(() => {
    handleDataSuggest();
  }, []);

  return (
    <div className="mb-5">
      <div className="font-semibold text-lg mb-4">Sim {simNumber}</div>
      <Card>
        {tel !== "" ? (
          <div className="flex flex-col gap-3">
            <div>
              Số sim: <span className="font-semibold">{simNumber}</span>
            </div>
            <div className="flex gap-2">
              Nhà mạng:{" "}
              <div
                style={{
                  backgroundImage: `url(${renderLogoTelUrl(tel)})`,
                  backgroundSize: "100% 100%",
                  width: 80,
                }}
              />
            </div>
            <div>
              Trạng thái:{" "}
              <span className="font-semibold text-[#ff4d00]">Đã bán</span>
            </div>
          </div>
        ) : (
          <div>
            Sim bạn tìm không tồn tại hoặc chưa cập nhật, <br />
            Vui lòng chọn lại hoặc tham khảo gợi ý dưới đây
          </div>
        )}
      </Card>
      <div className="font-semibold text-lg my-4">Gợi ý cho bạn</div>
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-5">
        {dataSuggest.length > 0 ? (
          dataSuggest.map((item: any) => <SimItem key={item?.id} sim={item} />)
        ) : (
          <div className="text-center italic text-semibold text-slate-700 md:col-span-2 xl:col-span-3">
            Không có sim để hiển thị
          </div>
        )}
      </div>
    </div>
  );
};

export default SimSold;
