import Card from "src/components/helpers/Card/Card";
import InputField from "../../../components/helpers/InputField";
import SimService from "../../../service/sim";
import { Heading, Pane, toaster } from "evergreen-ui";
import React from "react";
import { renderPrice } from "src/constants/shared";
import moment from "moment";

type OrderInfo = {
  address: string;
  name: string;
  phone: string | number;
  sim: string | number;
};

const OrderOnRequest = () => {
  const [orderInfo, setOrderInfo] = React.useState<OrderInfo>({
    address: "",
    name: "",
    phone: "",
    sim: "",
  });

  const [dataSuccess, setDataSuccess] = React.useState<any>();

  const handleChangeOrder = (key: string, value: any) => {
    switch (key) {
      case "address":
        setOrderInfo({ ...orderInfo, address: value });
        break;
      case "name":
        setOrderInfo({ ...orderInfo, name: value });
        break;
      case "phone":
        setOrderInfo({ ...orderInfo, phone: value });
        break;
      case "sim":
        setOrderInfo({ ...orderInfo, sim: value });
        break;
      default:
        break;
    }
  };

  const handleClickSend = async () => {
    if (!orderInfo.sim) toaster.warning("Số sim không được để trống");
    else if (!orderInfo.name) toaster.warning("Tên không được để trống");
    else if (!orderInfo.phone)
      toaster.warning("Số điện thoại không được để trống");
    else if (!orderInfo.address) toaster.warning("Địa chỉ không được để trống");
    else {
      const res = await SimService.postOrderSim(orderInfo);

      if (res.success) {
        setDataSuccess(res?.data);
        toaster.success("Đặt Sim thành công!");
      } else {
        toaster.danger(
          res?.message || res?.response?.message || "Đã xảy ra lỗi"
        );
      }
    }
  };

  return (
    <div>
      <h1 className="font-semibold">ĐẶT SIM THEO YÊU CẦU</h1>
      {dataSuccess ? (
        <div>
          <Pane
            display="flex"
            className="flex-col rounded-md bg-white w-12/12 md:w-9/12 lg:w-7/12 mx-auto"
            elevation={1}
            borderTop="4px solid #33cc33"
            marginTop="20px"
          >
            <div className="p-3 text-center">
              <Heading textAlign="center" textTransform="uppercase">
                Đặt hàng thành công!
              </Heading>
              <small className="italic">
                Cảm ơn bạn đã cho simvn có cơ hội phục vụ
              </small>
            </div>
            <div className="p-3">
              <h6 className="font-semibold mb-2">Thông tin đặt hàng</h6>
              <ul className="list-inside list-disc space-y-1 text-gray-500">
                <li>
                  Tên khách hàng:{" "}
                  <span className="font-semibold">{dataSuccess?.name}</span>
                </li>
                <li>
                  Số điện thoại:{" "}
                  <span className="font-semibold">{dataSuccess?.phone}</span>
                </li>
                <li>
                  Địa chỉ:{" "}
                  <span className="font-semibold">{dataSuccess?.address}</span>
                </li>
              </ul>
              <h6 className="font-semibold mt-3 mb-2">Thông tin đơn hàng</h6>
              <ul className="list-inside list-disc space-y-1 text-gray-500">
                <li>
                  SIM số đẹp:{" "}
                  <span className="font-semibold">{dataSuccess?.sim}</span>
                </li>
                <li>
                  Giá:{" "}
                  <span className="font-semibold">
                    {renderPrice(dataSuccess?.price || 0)}
                  </span>
                </li>
                <li>
                  Thời gian đặt:{" "}
                  <span className="font-semibold">
                    {moment(dataSuccess?.createdAt).format("HH:mm DD/MM/YYYY")}
                  </span>
                </li>
              </ul>
              <div className="text-xs mt-2 px-2 text-center text-[#33cc33] font-semibold italic">
                Cảm ơn quý khách đã tin tưởng và lựa chọn simvn. Hệ thống đã ghi
                nhận thông tin đặt hàng của quý khách. Trong vòng 5 phút, nhân
                viên sẽ gọi lại để xác nhận đơn hàng
              </div>
            </div>
          </Pane>
        </div>
      ) : (
        <div className="mt-5 md:w-7/12 sm:w-full mx-auto">
          <div className="italic mb-4 text-center text-lime-700">
            Miễn phí giao hàng toàn quốc
          </div>
          <div className="mb-3">
            <InputField
              required
              value={orderInfo.sim}
              onChange={(value: any) => handleChangeOrder("sim", value)}
              placeholder="Nhập số sim muốn mua"
            />
          </div>
          <div className="mb-3">
            <InputField
              required
              placeholder="Họ và tên"
              value={orderInfo.name}
              onChange={(value: any) => handleChangeOrder("name", value)}
            />
          </div>
          <div className="mb-3">
            <InputField
              required
              placeholder="Số điện thoại"
              value={orderInfo.phone}
              onChange={(value: any) => handleChangeOrder("phone", value)}
            />
          </div>
          <div className="mb-3">
            <InputField
              required
              placeholder="Địa chỉ giao sim"
              value={orderInfo.address}
              onChange={(value: any) => handleChangeOrder("address", value)}
            />
          </div>
          <div className="flex justify-center mb-3">
            <small className="italic">
              Sau khi bấm đặt mua, nhân viên giao dịch sẽ gọi lại cho bạn sau ít
              phút
            </small>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleClickSend}
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 w-6/12"
            >
              Đặt mua
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderOnRequest;
