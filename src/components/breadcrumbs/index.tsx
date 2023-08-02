import * as React from "react";

const BreadCrumbs = (props: any) => {
  const { crumbs } = props;

  // const renderCrumbs = () => {
  //   if (crumbs?.length) {
  //     return crumbs?.map((crumb: any) => `> ${crumb?.title}`)
  //   } else return null
  // }

  const renderCrumbs = () => {
    if (crumbs) {
      return <span>{`> ${crumbs}`}</span>;
    } else return null;
  };

  return (
    <div className="text-sm font-normal italic my-2">
      Sim.vn {renderCrumbs()}
    </div>
  );
};

export default BreadCrumbs;
