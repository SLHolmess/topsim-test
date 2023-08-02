import FindMoreContent from "../../seo-content";
import HeaderFilter from "../../filter-head";
import SimService from "../../../service/sim";
import * as React from "react";
import BlockItem from "./BlockItem";

const HomeView = (props: any) => {
  const { pathname, dataHome, dataContentSeo } = props;

  const paramsHome = {
    catId: "0",
    link: "/",
  };


  const installment = dataHome?.block?.installment;
  const promotion = dataHome?.block?.promotion;
  const viettel = dataHome?.block?.viettel;
  const vinaphone = dataHome?.block?.vinaphone;
  const mobifone = dataHome?.block?.mobifone;

  //* handler
  return (
    <>
      <div>
        <BlockItem data={promotion} />
      </div>
      <div>
        <BlockItem data={installment} />
      </div>
      <div>
        <BlockItem data={viettel} />
      </div>
      <div>
        <BlockItem data={vinaphone} />
      </div>
      <div>
        <BlockItem data={mobifone} />
      </div>
      <FindMoreContent dataContentSeo={dataContentSeo} />
    </>
  );
};

export default HomeView;
