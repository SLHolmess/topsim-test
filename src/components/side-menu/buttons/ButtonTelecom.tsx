import * as React from "react";

const ButtonTelecomFilter = (props: any) => {
  const { icon, link, tel } = props;

  return (
    // <a
    //   href={link}
    //   className="border rounded-lg px-3 py-1 bg-slate-200 cursor-pointer flex justify-center items-center mobile-logo-icon-side"
    // >
    //   <img alt="viettel" src={icon} width="70%" />
    // </a>
    <a
      href={link}
      className="border rounded-lg px-3 py-1 bg-slate-200 cursor-pointer flex justify-center items-center mobile-logo-icon-side"
    >
      <div
        className="h-[40px] w-full"
        style={{
          backgroundImage: `url(${icon})`,
          backgroundSize: tel === "itelecom" ? "45%" : "70%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}
      />
    </a>
  );
};

export default ButtonTelecomFilter;
