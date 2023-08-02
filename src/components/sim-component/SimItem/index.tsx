import * as React from "react";
import {
  parserHtmlToReact,
  renderIconSim,
  renderLogoTelUrl,
} from "src/constants/shared";

const SimItem = (props: any) => {
  const { sim } = props;

  return (
    <div className="flex-col lg:flex-col rounded-md px-3 py-2 bg-white">
      <a className="cursor-pointer" href={`/${sim.id}`}>
        {/* {renderIconSim(sim.telcoText)} */}
        <div
          style={{
            backgroundImage: `url(${renderLogoTelUrl(sim.telcoText)})`,
            backgroundSize:
              sim.telcoText === "mayban"
                ? "50% 70%"
                : sim.telcoText === "itelecom"
                ? "60%"
                : "100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center left",
            height: "30px",
            width: "60px",
          }}
        />
        <div className="text-lg md:text-xl font-semibold sim-title mb-1">
          {sim?.highlight ? parserHtmlToReact(sim?.highlight?.replace(/'/g, '')) : sim.id}
        </div>
        {/* <div className="text-xs text-[#ff4d00] my-2">{sim?.categoryText}</div> */}
        <div style={{ color: "#007a57" }} className="price-sim-item">
          {sim?.priceInstallment !== "" ? (
            <span className="text-xs">Trả góp {sim.priceInstallment}</span>
          ) : (
            sim?.priceFormatted
          )}
        </div>
      </a>
    </div>
  );
};

export default SimItem;
