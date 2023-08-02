import SelectField from "../../../components/helpers/SelectField";
import BreadCrumbs from "../../breadcrumbs";
import { toaster } from "evergreen-ui";
import React from "react";

const PhongThuyFilter = (props: any) => {
  const { pathname, searchString } = props;

  const searchParams = new URLSearchParams(searchString);
  const params = Object.fromEntries(searchParams?.entries());
  const [timeOptions, setTimeOptions] = React.useState<any>();
  const [dateOptions, setDateOptions] = React.useState<any>();
  const [monthOptions, setMonthOptions] = React.useState<any>();
  const [yearOptions, setYearOptions] = React.useState<any>();

  const defaultDateArr = params?.birth_date?.split("-");
  const defaultTimeArr = params?.birth_time?.split(":");

  const [valueForm, setValueForm] = React.useState({
    day: 1,
    month: 1,
    year: 1950,
    hour: "1",
    minute: 30,
    sex: "nam",
  });

  const handleChangeForm = (key: string, value: string) => {
    switch (key) {
      case "day":
        setValueForm({ ...valueForm, day: Number(value) });
        break;
      case "month":
        setValueForm({ ...valueForm, month: Number(value) });
        break;
      case "year":
        setValueForm({ ...valueForm, year: Number(value) });
        break;
      case "hour":
        setValueForm({ ...valueForm, hour: value.toString() });
        break;
      case "minute":
        setValueForm({ ...valueForm, minute: Number(value) });
        break;
      case "sex":
        setValueForm({ ...valueForm, sex: value });
        break;
      default:
        break;
    }
  };
 
  const handleSubmit = () => {
    if (
      !valueForm.day ||
      !valueForm.month ||
      !valueForm.year ||
      !valueForm.hour ||
      !valueForm.minute ||
      !valueForm.sex
    ) {
      toaster.danger("Vui lòng nhập đầy đủ thông tin!");
    } else {
      const payload = {
        birthDay: `${valueForm.year}-${valueForm.month}-${valueForm.day}`,
        birthTime: `${valueForm.hour}:${valueForm.minute}`,
        sex: `${valueForm.sex}`,
      };

      if (typeof window)
        window.location.href = `${pathname}?birth_date=${payload.birthDay}&birth_time=${payload.birthTime}&sex=${payload.sex}`;
    }
  };

  const minuteOptions = [
    {
      label: "00-30",
      value: 30,
    },
    {
      label: "31-59",
      value: 59,
    },
  ];

  const sexOptions = [
    {
      label: "Nam",
      value: "nam",
    },
    {
      label: "Nữ",
      value: "nu",
    },
  ];

  const makeOptions = (start: number, end: number) => {
    let options = [];

    for (let i = start; i <= end; i++) {
      const element = {
        label: i,
        value: i.toString(),
      };
      options.push(element);
    }
    return options;
  };

  React.useEffect(() => {
    const dates = makeOptions(1, 31);
    const months = makeOptions(1, 12);
    const years = makeOptions(1950, 2010);
    const times = makeOptions(0, 23);
    setDateOptions(dates);
    setMonthOptions(months);
    setYearOptions(years);
    setTimeOptions(times);
  }, []);

  React.useEffect(() => {
    if (
      defaultDateArr &&
      defaultTimeArr &&
      defaultDateArr.length >= 3 &&
      defaultTimeArr.length >= 2
    ) {
      setValueForm({
        ...valueForm,
        day: Number(defaultDateArr[2]),
        month: Number(defaultDateArr[1]),
        year: Number(defaultDateArr[0]),
        hour: defaultTimeArr[0],
        minute: Number(defaultTimeArr[1]),
        sex: params?.sex,
      });
    }
  }, []);

  return (
    <div>
      <BreadCrumbs crumbs={"Sim phong thủy"} />
      <div className="form-search-phong-thuy pt-2 mx-auto">
        <div className="font-phong-thuy text-3xl lg:text-5xl text-center lg:mt-3">
          Nhập thông tin
        </div>
        <div className="font-phong-thuy text-xl lg:text-4xl text-center mt-1">
          để chọn sim hợp phong thủy
        </div>
        <div className="w-80 flex flex-col md:flex-row gap-2 m-auto mt-3 items-center justify-center">
          <div className="text-stone-600 font-bold">Ngày sinh</div>
          <div className="flex gap-3">
            <div>
              <SelectField
                className="w-12 lg:w-16 sm: w-16"
                options={dateOptions}
                onChange={(value: string) => handleChangeForm("day", value)}
                defaultValue={valueForm.day}
              />
            </div>
            <div>
              <SelectField
                className="w-12 lg:w-16 sm: w-16"
                options={monthOptions}
                onChange={(value: string) => handleChangeForm("month", value)}
                defaultValue={valueForm.month}
              />
            </div>
            <div>
              <SelectField
                className="w-18 lg:w-20"
                options={yearOptions}
                onChange={(value: string) => handleChangeForm("year", value)}
                defaultValue={valueForm.year}
              />
            </div>
          </div>
        </div>
        <div className="w-80 flex flex-col md:flex-row m-auto mt-2 items-center gap-2 justify-center">
          <div className="text-stone-600 font-bold mr-2.5">Giờ sinh</div>
          <div className="flex gap-3">
            <div>
              <SelectField
                className="w-14 lg:w-28 sm: w-20"
                options={timeOptions}
                onChange={(value: string) => handleChangeForm("hour", value)}
                defaultValue={valueForm.hour}
              />
            </div>
            <div>
              <SelectField
                className="w-22 lg:w-28"
                options={minuteOptions}
                onChange={(value: string) => handleChangeForm("minute", value)}
                defaultValue={valueForm.minute}
              />
            </div>
          </div>
        </div>
        <div className="w-80 flex flex-col md:flex-row m-auto mt-2 items-center gap-3 justify-center">
          <div className="text-stone-600 font-bold mr-2">Giới tính</div>
          <div>
            <SelectField
              className="w-24"
              options={sexOptions}
              onChange={(value: string) => handleChangeForm("sex", value)}
              defaultValue={valueForm.sex}
            />
          </div>
        </div>
        <div>
          <div
            onClick={handleSubmit}
            className="button-phong-thuy mx-auto mt-3 cursor-pointer"
          >
            Chọn sim hợp tuổi
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhongThuyFilter;
