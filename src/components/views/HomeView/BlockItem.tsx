import SimItem from "src/components/sim-component/SimItem";


const BlockItem = (props: any) => {
  const { data } = props;

  const listSim = data && data?.listSim ? data?.listSim : [];

  return (
    <>
      <div className="font-semibold text-2xl my-4">{data?.title}</div>
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-5">
        {listSim.map((item: any) => (
          <SimItem
            key={item?.id}  
            sim={item}
          />
        ))}
      </div>
      {listSim && (
        <div className="mt-3 w-full text-right">
          <a
            href={data?.url}
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 width-block-button"
          >
            Xem thêm {data?.title}
          </a>
        </div>
      )}
    </>
  );
};

export default BlockItem;
