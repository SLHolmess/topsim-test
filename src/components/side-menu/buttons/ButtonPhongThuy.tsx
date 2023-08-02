import * as React from "react";

const ButtonPhongThuyFilter = (props: any) => {
  const { icon, label, link } = props;
  return (
    <a
      href={link}
      className="border rounded-lg py-1 px-1 mb-5 bg-slate-200 font-semibold text-normal cursor-pointer flex flex-col justify-center items-center"
    >
      <img src={icon} width={40} alt={label || ""} />
      <div>{label}</div>
    </a>
  );
};

export default ButtonPhongThuyFilter;
