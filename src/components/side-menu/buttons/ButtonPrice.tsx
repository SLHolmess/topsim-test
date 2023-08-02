import * as React from "react";

const ButtonPriceFilter = (props: any) => {
  const { title, link } = props;

  return (
    <a href={link} className="border rounded-lg py-2 px-1 bg-slate-200 font-semibold text-sm cursor-pointer flex justify-center items-center">
      <span className="text-center md:text-xs 2xl:text-sm">{title}</span>
    </a>
  );
};

export default ButtonPriceFilter;
