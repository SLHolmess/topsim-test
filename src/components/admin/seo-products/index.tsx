import {
  Button,
  Heading,
  Pagination,
  Pane,
  Popover,
  Position,
  toaster,
} from "evergreen-ui";
import React from "react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import { productCategories } from "src/constants/config";
import SEOProductService from "src/helpers/client/services/seo-config";
import Create from "./Create";
import Update from "./Update";
import Filter from "./Filter";
import { filterEmptyValues, renderPrice } from "src/constants/shared";

type Props = {};

const statuses = [
  { value: "0", label: "Bản nháp" },
  { value: "1", label: "Chờ duyệt" },
  { value: "2", label: "Công khai" },
];

const SeoProduct = (props: Props) => {
  const initialFilter = {
    category: null,
    priceFrom: null,
    priceTo: null,
    title: "",
    h1: "",
    status: null,
  };
  const [filter, setFilter] = React.useState<any>(initialFilter);

  const [dataSeo, setDataSeo] = React.useState<any>();
  const [loading, setLoading] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openCreateDefault, setOpenCreateDefault] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [dataDetail, setDataDetail] = React.useState<any>();
  const [isFilter, setIsFilter] = React.useState(false);
  const [pagination, setPagination] = React.useState({
    page: 0,
    limit: 0,
    total: 0,
  });

  const list = dataSeo?.data || [];

  const total = pagination?.total;

  function calculateTotalPages(
    totalRecords: number,
    recordsPerPage: number
  ): number {
    const totalPages = Math.ceil(totalRecords / recordsPerPage);
    return totalPages;
  }

  const totalPages = calculateTotalPages(total, pagination.limit);

  //* handler
  const handleDataSeo = async (params?: string) => {
    setLoading(true);
    const res = await SEOProductService.getList(params);

    if (res?.success) {
      setDataSeo(res);
    } else {
      toaster.danger(res.message || "Không lấy được danh sách");
    }
    setLoading(false);
  };

  const handleDelete = async (id: any, close: any) => {
    try {
      const res = await SEOProductService.deleteSeo(id);
      if (res?.data?.success) {
        toaster.success("Xóa cấu hình thành công");
        close();
        handleDataSeo();
      } else {
        toaster.danger(res?.data?.message || "Failed to delete");
      }
    } catch (error: any) {
      toaster.danger(error?.response?.data?.message || "Failed to delete");
    }
  };

  //* change page
  const onNextPage = () => {
    const newFilter = {
      ...filter,
      page: pagination.page + 1,
    };

    const param = new URLSearchParams(filterEmptyValues(newFilter)).toString();
    handleDataSeo(param);
  };

  const onPreviousPage = () => {
    const newFilter = {
      ...filter,
      page: pagination.page - 1,
    };

    const param = new URLSearchParams(filterEmptyValues(newFilter)).toString();
    handleDataSeo(param);
  };

  const onPageChange = (page: any) => {
    const newFilter = {
      ...filter,
      page: page,
    };

    const param = new URLSearchParams(filterEmptyValues(newFilter)).toString();
    handleDataSeo(param);
  };

  //* Effect
  React.useEffect(() => {
    handleDataSeo();
  }, []);

  React.useEffect(() => {
    if (dataSeo) {
      const meta = dataSeo?.meta;
      setPagination({
        page: meta?.page,
        limit: meta?.limit,
        total: meta?.total,
      });
    }
  }, [dataSeo]);

  return (
    <div>
      <div className="flex gap-2 mb-3">
        <Heading className="pb-3 flex grow">Quản lý SEO sản phẩm</Heading>
        <div className="flex gap-1">
          <Button onClick={() => setOpenCreate(true)} appearance="primary">
            Thêm mới cấu hình
          </Button>
          <Button
            onClick={() => setOpenCreateDefault(true)}
            appearance="primary"
          >
            Thêm cấu hình mặc định
          </Button>
          <Button
            appearance="primary"
            intent="success"
            onClick={() => setIsFilter(true)}
          >
            Lọc
          </Button>
        </div>
      </div>
      <Table data={list} loading={loading} autoHeight>
        <Column width={200} fixed resizable>
          <HeaderCell className="font-semibold">Danh mục</HeaderCell>
          <Cell dataKey="category">
            {(data) =>
              productCategories.find((i) => i.id.toString() === data.category)
                ?.text
            }
          </Cell>
        </Column>

        <Column width={250} resizable>
          <HeaderCell className="font-semibold">Khoảng giá</HeaderCell>
          <Cell>
            {(data) =>
              `${renderPrice(data.priceFrom || 0)} - ${renderPrice(
                data.priceTo || 0
              )}`
            }
          </Cell>
        </Column>

        <Column width={300} resizable>
          <HeaderCell className="font-semibold">Tiêu đề</HeaderCell>
          <Cell dataKey="title" />
        </Column>

        <Column width={200} resizable>
          <HeaderCell className="font-semibold text-center">
            Trạng thái
          </HeaderCell>
          <Cell className="text-center">
            {(data) => statuses.find((s) => s.value == data.status)?.label}
          </Cell>
        </Column>

        <Column width={250} resizable flexGrow={1}>
          <HeaderCell className="font-semibold">H1</HeaderCell>
          <Cell dataKey="h1" />
        </Column>

        <Column width={200} resizable>
          <HeaderCell className="font-semibold text-center">Actions</HeaderCell>
          <Cell className="text-center">
            {(data) => (
              <div className="flex gap-2 justify-center">
                  <Button
                    onClick={() => {
                      setOpenUpdate(true);
                      setDataDetail(data);
                    }}
                  >
                    Xem
                  </Button>
                <Popover
                  content={({ close }) => (
                    <Pane
                      // width={240}
                      // height={240}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexDirection="row"
                      gap="10px"
                      padding="20px"
                    >
                      <div>Bạn có chắc muốn xóa cầu hình này?</div>
                      <Button
                        appearance="primary"
                        intent="danger"
                        onClick={() => handleDelete(data?._id, close)}
                      >
                        Đồng ý
                      </Button>
                    </Pane>
                  )}
                  position={Position.BOTTOM_RIGHT}
                >
                  <Button appearance="primary" intent="danger">
                    Xóa
                  </Button>
                </Popover>
              </div>
            )}
          </Cell>
        </Column>
      </Table>
      <div className="flex justify-end mt-3">
        <Pagination
          page={pagination.page}
          totalPages={totalPages}
          onPageChange={onPageChange}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
        />
      </div>
      <Create
        isOpen={openCreate}
        setOpen={setOpenCreate}
        handleDataSeo={handleDataSeo}
        isOpenDefault={openCreateDefault}
        setOpenDefault={setOpenCreateDefault}
      />
      <Update
        isOpen={openUpdate}
        setOpen={setOpenUpdate}
        handleDataSeo={handleDataSeo}
        data={dataDetail}
      />
      <Filter
        isShown={isFilter}
        setIsShown={setIsFilter}
        handleDataSeo={handleDataSeo}
        initialFilter={initialFilter}
        filter={filter}
        setFilter={setFilter}
      />
    </div>
  );
};

export default SeoProduct;
