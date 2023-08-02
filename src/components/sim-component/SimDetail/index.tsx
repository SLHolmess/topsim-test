import { parserHtmlToReact, renderLogo } from "src/constants/shared";
import logo from "src/assets/images/logo";
import Card from "src/components/helpers/Card/Card";
import BreadCrumbs from "src/components/breadcrumbs";
import { Pane } from "evergreen-ui";
import { replaceSimDetailVariables } from "src/helpers/client/helpers";

const SimDetail = (props: any) => {
  const { dataDetail, seoConfig } = props;

  const id = dataDetail?.simInfo?.detail?.id || "";
  const highlight = dataDetail?.simInfo?.detail?.highlight || "";
  const title = dataDetail?.simInfo?.title || "";
  const crumbs = dataDetail?.simInfo?.crumbs || "";
  const thumbnail = dataDetail?.simInfo?.thumbnail || "";
  const price = dataDetail?.simInfo?.detail?.priceFormatted || "";
  const tel = dataDetail?.simInfo?.detail?.telcoText || "";
  const category = dataDetail?.simInfo?.detail?.categoryText || "";
  
  return (
    <>
      <BreadCrumbs crumbs={`Sim ${id}`} />
      <h1 className="font-semibold text-lg my-4">
        {replaceSimDetailVariables(id, tel, category, price, seoConfig?.h1 || '') || title || "Sim" + id}
      </h1>
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-6 md:items-stretch">
        <Pane
          marginBottom="10px"
          display="flex"
          className="flex-col rounded-md py-3 px-5 bg-[#fff] md:w-7/12"
          elevation={1}
        >
          <div className="mt-3 flex gap-5 font-semibold items-center">
            <div className="flex-grow">Nhà mạng:</div>
            <div className="w-4/12 flex justify-end">
              {renderLogo(tel)}
            </div>
          </div>

          <div className="flex gap-5 mt-4 font-semibold items-center">
            <div className="flex-grow">Số sim:</div>
            <div>
              <h2 className="text-2xl text-red-500 font-bold not-italic">
                {highlight !== "" ? parserHtmlToReact(highlight.replace(/'/g, "")): id}
              </h2>
            </div>
          </div>

          <div className="mt-3 font-semibold flex">
            <div className="flex-grow">Giá bán:</div>
            <div className="text-lg text-orange-500">{price}</div>
          </div>

          <div className="mt-3 font-semibold flex">
            <div className="flex-grow">Kiểu số đẹp:</div>
            <div>{category}</div>
          </div>
        </Pane>
        {thumbnail && thumbnail !== "" && (
          <Pane
            marginBottom="10px"
            display="flex"
            className="flex-col lg:flex-col rounded-md p-3 bg-[#fff] md:w-5/12"
            elevation={1}
          >
            <img src={thumbnail} alt={id} />
          </Pane>
        )}
      </div>
    </>
  );
};

export default SimDetail;
