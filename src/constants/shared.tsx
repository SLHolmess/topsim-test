import logo from "../assets/images/logo";
import parse from "html-react-parser";
import { filterTel } from "./config";

export const parserHtmlToReact = (htmlString: string) => {
  if (htmlString) {
    const reactElement = parse(htmlString);
    return reactElement;
  } else return "";
};

export const renderTitle = (crumbs: any, title: any, activeFilter: any) => {
  if (title) {
    return title;
  } else if (crumbs && crumbs.length) {
    return crumbs[crumbs?.length - 1]?.title;
  } else if (activeFilter?.telco) {
    return activeFilter?.telco + " " + activeFilter?.price;
  } else return "Sim số đẹp";
};

export const renderIconSim = (tel: string) => {
  switch (tel) {
    case "viettel":
      return <div className="icon-sim-item viettel-logo" />;
    case "vinaphone":
      return <div className="icon-sim-item vinaphone-logo" />;
    case "vietnamobile":
      return <div className="icon-sim-item vietnamobile-logo" />;
    case "itelecom":
      return <div className="icon-sim-item itelecom-logo" />;
    case "mobifone":
      return <div className="icon-sim-item mobifone-logo" />;
    case "gmobile":
      return <div className="icon-sim-item gmobile-logo" />;
    case "mayban":
      return (
        <div
          className="icon-sim-item"
          style={{
            backgroundImage: `url(${logo.LogoMayban})`,
            backgroundSize: "50%",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* <img
            alt="gmobile"
            src={logo.LogoMayban}
            width="100%"
            height="100%"
          /> */}
        </div>
      );
    default:
      break;
  }
};

export const renderLogo = (telName?: string) => {
  if (telName?.indexOf("viettel") !== -1) {
    return <img alt="viettel" src={logo.LogoViettel} width="80%" />;
  } else if (telName?.indexOf("vinaphone") !== -1) {
    return <img alt="vinaphone" src={logo.LogoVinaphone} width="100%" />;
  } else if (telName?.indexOf("mobifone") !== -1) {
    return <img alt="mobifone" src={logo.LogoMobifone} width="100%" />;
  } else if (telName?.indexOf("vietnamobile") !== -1) {
    return <img alt="vietnamobile" src={logo.LogoVietnamobile} width="80%" />;
  } else if (telName?.indexOf("gmobile") !== -1) {
    return <img alt="gmobile" src={logo.LogoGmobile} width="80%" />;
  } else if (
    telName?.indexOf("itelecom") !== -1 ||
    telName?.indexOf("itel") !== -1
  ) {
    return <img alt="itelecom" src={logo.LogoItel} width="80%" />;
  } else if (telName?.indexOf("mayban") !== -1) {
    return <img alt="mayban" src={logo.LogoMayban} width="30%" />;
  }
};

export const renderLogoTelUrl = (tel: string) => {
  if (tel === "mayban") {
    return logo.LogoMayban;
  } else {
    const item = filterTel.find((i: any) => i.telco === tel);

    if (item) return item?.icon;
    else return "";
  }
};

export const renderPrice = (price: number) => {
  const newPrice = Math.round(Number(price));
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formatter.format(newPrice);
};

export const convertQueryParamsToObject = (
  urlParams: URLSearchParams
): { [key: string]: string } => {
  const queryParams: { [key: string]: string } = {};

  urlParams.forEach((value, key) => {
    queryParams[key] = value;
  });

  return queryParams;
};

export function filterEmptyValues(obj: any): any {
  const result: any = {};

  for (const key in obj) {
    const value = obj[key];
    if (value !== '' && value !== null && value !== undefined) {
      result[key] = value;
    }
  }

  return result;
}
