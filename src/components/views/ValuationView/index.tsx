import SimCLService from "src/helpers/client/services/sim-cl";
import Card from "../../../components/helpers/Card/Card";
import CardTitle from "../../../components/helpers/Card/CardTitle";
import InputField from "../../../components/helpers/InputField";
import BreadCrumbs from "../../breadcrumbs";
import { Button, TextInput, toaster } from "evergreen-ui";
import React from "react";

const ValuationView = () => {
  const paramsValuation = {
    link: "/dinh-gia-sim",
  };

  const [number, setNumber] = React.useState("");
  const [numberKey, setNumberKey] = React.useState("")
  const [dataValuation, setDataValuation] = React.useState<any>();

  const valuation = dataValuation?.data?.valuation;

  const handleGetValuation = async () => {
    setNumberKey(number)
    const res = await SimCLService.getValuation(number);

    if (res.success) setDataValuation(res);
    else toaster.danger(res?.response?.message || "Đã xảy ra lỗi");
  }; 

  return (
    <div>
      <BreadCrumbs crumbs={"Định giá sim"} />
      <div className="font-semibold text-2xl mb-2">ĐỊNH GIÁ SIM</div>
      <Card>
        <CardTitle>Nhập số sim cần định giá</CardTitle>
        <div className="w-12/12 md:w-5/12">
          <InputField
            required
            placeholder="Số sim cần định giá"
            value={number}
            onChange={(value: any) => setNumber(value)}
          />
        </div>
        <div className="mt-4">
          <Button
            onClick={handleGetValuation}
            appearance="primary"
            intent="none"
          >
            Xem định giá sim
          </Button>
        </div>
        {valuation && number && (
          <div className="text-lime-600 font-semibold mt-3 text-center">
            Sim <span className="text-orange-600">{Object.keys(valuation)[0] || ""}</span>{" "}
            của bạn được định giá{" "}
            <span className="text-orange-600">{valuation?.[numberKey] || ""}₫</span>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ValuationView;
