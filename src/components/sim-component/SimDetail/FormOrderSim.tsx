import { toaster } from "evergreen-ui";
import React from "react";
import { renderPrice } from "src/constants/shared";
import Card from "src/components/helpers/Card/Card";
import Axios from "src/helpers/client/axios";
import InputField from "src/components/helpers/InputField";

type DataFormType = {
  sim: string;
  name: string;
  phone: string;
  address: string;
  other_option?: string;
};

const FormOrderSim = (props: any) => {
  const { dataDetail } = props;

  const [dataForm, setDataForm] = React.useState<DataFormType>({
    sim: dataDetail?.simInfo?.detail?.id,
    name: "",
    phone: "",
    address: "",
    other_option: "",
  });

  const [errorForm, setErrorForm] = React.useState({
    name: "",
    phone: "",
  });

  const [dataRes, setDataRes] = React.useState<any>();

  const simOrder = dataRes?.data;

  const handleChangeForm = (key: string, value: any) => {
    switch (key) {
      case "name":
        setDataForm({ ...dataForm, name: value });
        if (value)
          setErrorForm((prev) => {
            return {
              ...prev,
              name: "",
            };
          });
        else
          setErrorForm((prev) => {
            return {
              ...prev,
              name: "Vui lòng nhập họ và tên",
            };
          });
        break;
      case "phone":
        setDataForm({ ...dataForm, phone: value });
        if (value)
          setErrorForm((prev) => {
            return {
              ...prev,
              phone: "",
            };
          });
        else
          setErrorForm((prev) => {
            return {
              ...prev,
              phone: "Vui lòng nhập số điện thoại",
            };
          });
        break;
      case "address":
        setDataForm({ ...dataForm, address: value });
        break;
      case "other_option":
        setDataForm({ ...dataForm, other_option: value });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    if (!dataForm.name)
      setErrorForm((prev: any) => {
        return {
          ...prev,
          name: "Vui lòng nhập họ và tên",
        };
      });
    if (!dataForm.phone)
      setErrorForm((prev: any) => {
        return {
          ...prev,
          phone: "Vui lòng nhập số điện thoại",
        };
      });

    if (dataForm.name && dataForm.phone) {
      const res: any = await Axios.post(`order/place`, dataForm);

      if (res?.data?.success) {
        setDataRes(res?.data);
        toaster.success("Đặt sim thành công!");
      } else {
        toaster.danger(res?.message || "Đã có lỗi xảy ra!");
      }
    }
  };

  return (
    <div>
      <h2 className="font-semibold my-3 md:text-xl">Đặt mua sim</h2>
      <Card>
        {dataRes ? (
          <div>
            <div className="my-3 text-lime-700 font-semibold text-center text-lg italic">
              Đặt sim thành công
            </div>
            <div className="italic">
              Cảm ơn quý khách đã cho sim.vn có cơ hội phục vụ
            </div>
            <div className="italic">
              Trong 5 phút, giao dịch viên sẽ gọi lại cho quý khách
            </div>
            <div className="p-3 border my-3">
              <div className="font-semibold uppercase text-xl text-slate-500">
                Thông tin đơn hàng
              </div>
              <ul>
                <li>
                  Số thuê bao: <b className="text-lime-700">{simOrder?.sim}</b>
                </li>
                <li>
                  Giá bán:{" "}
                  <span className="font-semibold text-orange-600">
                    {renderPrice(simOrder?.price)}
                  </span>
                </li>
              </ul>
              <div className="border-b-2 border-dashed my-4" />
              <ul>
                <li>Khách hàng: {simOrder?.name}</li>
                <li>Điện thoại liên hệ: {simOrder?.phone}</li>
                <li>Địa chỉ giao hàng: {simOrder?.address}</li>
              </ul>
            </div>
            <div className="font-semibold text-slate-600">
              Thủ tục đăng kí chính chủ sim:
            </div>
            <ol className="text-sm text-slate-600">
              <li>
                1, Ảnh chứng minh thư (hoặc Căn cước công dân hoặc Hộ chiếu) của
                chủ thuê bao
              </li>
              <li>2, Ảnh chân dung của chủ thuê bao tại thời điểm giao dịch</li>
            </ol>
            <div className="italic text-slate-600">
              Quý khách vui lòng chuẩn bị trước để cung cấp cho nhân viên giao
              dịch khi mua sim.
            </div>
            <div className="my-5">
              Khi cần hỗ trợ vui lòng gọi{" "}
              <span className="font-semibold text-sky-700">02466.888.333</span>{" "}
              (7:30-22:00)
            </div>
            <a
              href="/"
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Mua thêm sim khác
              </span>
            </a>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="grid md:grid-cols-2 gap-4 md:gap-10">
              <InputField
                title="Họ và tên"
                name="name"
                required
                value={dataForm?.name}
                onChange={(value: string) => handleChangeForm("name", value)}
                errorMessage={errorForm?.name}
              />
              <InputField
                title="Số điện thoại"
                type="tel"
                name="phone"
                required
                value={dataForm?.phone}
                onChange={(value: string) => handleChangeForm("phone", value)}
                errorMessage={errorForm?.phone}
              />
            </div>
            <InputField
              title="Địa chỉ"
              name="address"
              required
              value={dataForm?.address}
              onChange={(value: string) => handleChangeForm("address", value)}
            />
            <InputField
              title="Ghi chú"
              type="textarea"
              name="other_option"
              value={dataDetail?.other_option}
              onChange={(value: string) =>
                handleChangeForm("other_option", value)
              }
            />
            <div className="w-4/12 md:w-3/12 mx-auto">
              <button
                onClick={handleSubmit}
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-full"
              >
                Đặt mua
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default FormOrderSim;
