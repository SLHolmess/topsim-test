import { parserHtmlToReact } from "../../constants/shared";

const FindMoreContent = (props: any) => {
  const { dataContentSeo } = props;

  const findMoreItems = dataContentSeo?.related_links;

  const contentHTMl = dataContentSeo?.detail;
  return (
    <div className="flex flex-col mt-4">
      {findMoreItems.length > 0 && (
        <div>
          <h3 className="font-semibold text-base md:text-lg text-[#0071c7] mb-2">
            Mọi người cũng tìm kiếm
          </h3>
          {findMoreItems.map((item: any, index: number) => (
            <a href={`${item.link}`} key={index} className="float-left">
              <div className="px-3 py-1 bg-white mr-3 mb-3 text-sm rounded font-semibold text-[#009900]">{item.label}</div>
            </a>
          ))}
        </div>
      )}
      <div className="find-more-content my-3 p-4">
        {parserHtmlToReact(contentHTMl)}
      </div>
    </div>
  );
};

export default FindMoreContent;
