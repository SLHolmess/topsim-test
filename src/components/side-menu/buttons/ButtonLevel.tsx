import * as React from "react";

const ButtonLevelFilter = (props: any) => {
  const { title, label, link } = props;

  return (
    <a href={link} className="border rounded-lg py-1 px-1 bg-slate-200 cursor-pointer flex flex-col items-center justify-center">
      <span className=" font-semibold text-lg text-orange-500">
        {title}
      </span>
      <span className="font-semibold md:text-xs 2xl:text-sm text-center">{label}</span>
    </a>
  );
};

export default ButtonLevelFilter;
