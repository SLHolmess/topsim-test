import {
  Dialog,
  CrossIcon,
  Popover,
  Pagination,
  TextInput,
  SelectMenu,
  Heading,
  Button,
  Textarea,
  SideSheet,
  toaster,
} from "evergreen-ui";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useState } from "react";
import Axios from "../../helpers/client/axios";

import "rsuite-table/dist/css/rsuite-table.css";
import { SEOsStaticService } from "src/helpers/client/services/seo-config";
import { filterEmptyValues } from "src/constants/shared";

interface Props {
  searchParams: string;
}

interface EditConfigForm {
  category?: any;
  status?: any;
  detail?: string;

  link?: string;
  h1?: string;
  title?: string;
  image?: string;
  description?: string;
  related_links?: string;
  content?: string;
  thumbnail?: any
}

interface FilterForm {
  category?: any;
  status?: any;

  link?: string;
}

const statuses = [
  { value: "0", label: "Bản nháp" },
  { value: "1", label: "Chờ duyệt" },
  { value: "2", label: "Công khai" },
];

const categories = [
  { value: "0", label: "Tổng quát" },
  { value: "1", label: "Giá" },
  { value: "2", label: "Loại" },
  { value: "3", label: "Mạng" },
  { value: "4", label: "Đầu số" },
  { value: "5", label: "Đuôi số" },
  { value: "6", label: "Đầu số * Đuôi số" },
  { value: "7", label: "Giữa số" },
];

export default function SeoStaticTable(props: Props) {

  const [editing, setEditing] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>();
  const [form, setForm] = useState<EditConfigForm>({});
  const [errors, setErrors] = useState<any>({});

  const [filtering, setFiltering] = useState<boolean>(false);
  const [filterForm, setFilterForm] = useState<FilterForm>({});

  //TODO: Duy
  const [loadingCreate, setLoadingCreate] = useState<boolean>(false);
  const [loadingTable, setLoadingTable] = useState<boolean>(false);
  const [dataConfigs, setDataConfigs] = useState<any>();
  const [pagination, setPagination] = useState<any>({
    page: 1,
    limit: 20,
    total: 0,
  });

  const total = pagination?.total;

  function calculateTotalPages(
    totalRecords: number,
    recordsPerPage: number
  ): number {
    const totalPages = Math.ceil(totalRecords / recordsPerPage);
    return totalPages;
  }

  const totalPages = calculateTotalPages(total, pagination.limit);


  const handleGetConfigs = async (params?: string) => {
    setLoadingTable(true);
    const res = await SEOsStaticService.getConfigs(params);

    if (res.success) {
      setDataConfigs(res);
    } else {
      toaster.danger(res.message || "Không lấy được dữ liệu");
    }
    setLoadingTable(false);
  };

  const edit = (data: any) => {
    setSelected(data);
    setEditing(true);
    setForm({
      ...data,
      category: data.category.toString(),
      status: data.status.toString(),
    });
  };

  const create = () => {
    setCreating(true);
    setForm({});
  };

  const addNewConfig = async () => {
    setLoadingCreate(true);
    const configRes = await Axios.post(`seo/static-configs`, form);

    if (configRes.data.success) {
      setCreating(false);
      setForm({});
      handleGetConfigs();

      toaster.success("Tạo cấu hình thành công", { duration: 3 });
    } else {
      toaster.danger(configRes.data.message, { duration: 3 });

      if (configRes.data.code === "VALIDATION_ERROR") {
        const errorData = configRes.data.data;
        for (let errKey of Object.keys(errorData)) {
          errorData[errKey] = errorData[errKey].msg;
        }
        setErrors(errorData);
      }
    }
    setLoadingCreate(false);
  };

  const update = async () => {
    const configRes = await Axios.put(`seo/static-configs/${selected._id}`, {
      ...form,
      related_links: undefined,
    });

    if (configRes.data.success) {
      setEditing(false);
      setForm({});

      toaster.success("Cập nhật dữ liệu thành công");

      handleGetConfigs();
    }
  };

  const remove = async (configId: any, close: any) => {
    close();
    const configRes = await Axios.delete(`seo/static-configs/${configId}`);

    if (configRes.data.success) {
      toaster.success("Đã xóa dữ liệu");

      handleGetConfigs();
    }
  };

  const handleFilter = () => {
    const params = new URLSearchParams(
      filterEmptyValues(filterForm)
    ).toString();

    handleGetConfigs(params);
  };

  const onPageChange = (page: any) => {
    const newFilter = {
      ...filterForm,
      page: page,
    };

    const param = new URLSearchParams(filterEmptyValues(newFilter)).toString();
    handleGetConfigs(param);
  };

  const onNextPage = () => {
    const newFilter = {
      ...filterForm,
      page: pagination.page + 1,
    };

    const param = new URLSearchParams(filterEmptyValues(newFilter)).toString();
    handleGetConfigs(param);
  };

  const onPreviousPage = () => {
    const newFilter = {
      ...filterForm,
      page: pagination.page - 1,
    };

    const param = new URLSearchParams(filterEmptyValues(newFilter)).toString();
    handleGetConfigs(param);
  };

  useEffect(() => {
    handleGetConfigs();
  }, []);

  useEffect(() => {
    if (dataConfigs) {
      const meta = dataConfigs?.meta;
      setPagination({
        page: meta?.page,
        limit: meta?.limit,
        total: meta?.total,
      });
    }
  }, [dataConfigs]);

  return (
    <div>
      <div className="flex gap-2">
        <Heading className="pb-3 flex grow">Quản lý SEO trang tĩnh</Heading>
        <div className="flex gap-1">
          <Button appearance="primary" onClick={create}>
            Thêm mới
          </Button>
          <Button
            appearance="primary"
            intent="success"
            onClick={() => setFiltering(true)}
          >
            Lọc
          </Button>
        </div>
      </div>

      <Table data={dataConfigs?.data} autoHeight loading={loadingTable}>
        <Column width={300} fixed resizable>
          <HeaderCell className="font-semibold">Link</HeaderCell>
          <Cell dataKey="link">
            {(data) => (
              <div className="cursor-pointer" onClick={() => edit(data)}>
                {data.link}
              </div>
            )}
          </Cell>
        </Column>

        <Column width={100} resizable>
          <HeaderCell className="font-semibold">Danh mục</HeaderCell>
          <Cell>
            {(data) => categories.find((c) => c.value == data.category)?.label}
          </Cell>
        </Column>

        <Column width={100} resizable>
          <HeaderCell className="font-semibold">Trạng thái</HeaderCell>
          <Cell>
            {(data) => statuses.find((s) => s.value == data.status)?.label}
          </Cell>
        </Column>

        <Column width={500} resizable>
          <HeaderCell className="font-semibold">Title</HeaderCell>
          <Cell dataKey="title" />
        </Column>

        <Column width={300} resizable>
          <HeaderCell className="font-semibold">H1</HeaderCell>
          <Cell dataKey="h1" />
        </Column>

        <Column width={300} resizable>
          <HeaderCell className="font-semibold">Image</HeaderCell>
          <Cell dataKey="image" />
        </Column>

        <Column width={200} resizable align="center" fixed="right">
          <HeaderCell className="font-semibold">Action</HeaderCell>
          <Cell align="center">
            {(data) => (
              <div className="flex gap-2 justify-center">
                <Button onClick={() => edit(data)}>Xem</Button>
                <Popover
                  content={({ close }) => (
                    <div className="p-3 w-300 flex gap-2 items-center">
                      <div className="flex-grow">
                        Bạn muốn xóa cấu hình này?
                      </div>
                      <Button
                        appearance="primary"
                        intent="danger"
                        onClick={() => remove(data._id, close)}
                      >
                        Yolo!
                      </Button>
                    </div>
                  )}
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

      {/* Pagination */}
      <div className="mt-3 flex justify-end">
        <Pagination
          page={pagination.page}
          totalPages={totalPages}
          onPageChange={onPageChange}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
        />
      </div>

      {/* Edit dialog */}
      <Dialog
        width={1000}
        isShown={editing}
        title={`Cấu hình SEO: ${selected?.link}`}
        confirmLabel="Cập nhật"
        cancelLabel="Đóng"
        onCloseComplete={() => setEditing(false)}
        onConfirm={update}
      >
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <div className="flex flex-col gap-1 flex-1">
              <strong>Danh mục</strong>
              <SelectMenu
                title="Danh mục"
                options={categories}
                selected={form.category}
                closeOnSelect
                onSelect={(item) => setForm({ ...form, category: item.value })}
              >
                <Button>
                  {form.category
                    ? categories.find((c) => c.value === form.category)?.label
                    : "Chọn danh mục"}
                </Button>
              </SelectMenu>
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <strong>Trạng thái</strong>
              <SelectMenu
                title="Trạng thái"
                options={statuses}
                selected={form.status}
                closeOnSelect
                onSelect={(item) => setForm({ ...form, status: item.value })}
              >
                <Button>
                  {form.status
                    ? statuses.find((s) => s.value === form.status)?.label
                    : "Chọn trạng thái"}
                </Button>
              </SelectMenu>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col gap-1 flex-1">
              <strong>Đường dẫn</strong>
              <TextInput
                style={{ width: "100%" }}
                value={form.link}
                onChange={(e: any) => setForm({ ...form, link: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <strong>Tiêu đề</strong>
              <TextInput
                style={{ width: "100%" }}
                value={form.title}
                onChange={(e: any) => setForm({ ...form, title: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col gap-1 flex-1">
              <strong>H1</strong>
              <TextInput
                style={{ width: "100%" }}
                value={form.h1}
                onChange={(e: any) => setForm({ ...form, h1: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <strong>Hình ảnh</strong>
              <div className="flex flex-row gap-2">
                <TextInput
                  style={{ width: "100%" }}
                  value={form?.thumbnail}
                  onChange={(e: any) =>
                    setForm({ ...form, thumbnail: e.target.value })
                  }
                />
                <Button appearance="primary" intent="primary">
                  Upload
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col gap-1 flex-1">
              <strong>Mô tả</strong>
              <Textarea
                style={{ width: "100%", height: "100px" }}
                value={form.description}
                onChange={(e: any) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <strong>Link liên quan</strong>
              <Textarea
                style={{ width: "100%", height: "100px" }}
                value={JSON.stringify(form.related_links)}
                onChange={(e: any) =>
                  setForm({ ...form, related_links: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col gap-1 flex-1">
              <strong>Nội dung chân trang</strong>
              <Editor
                value={form.detail}
                onEditorChange={(editorContent) =>
                  setForm({ ...form, detail: editorContent })
                }
                apiKey="no-api-key"
                init={{
                  height: 500,
                  menubar: true,
                  plugins: [
                    "image",
                    "code",
                    "table",
                    "link",
                    "media",
                    "codesample",
                  ],
                  toolbar:
                    "undo redo | formatselect | " +
                    "bold italic backcolor | alignleft aligncenter " +
                    "alignright alignjustify | table | bullist numlist outdent indent | " +
                    "removeformat | code",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />
            </div>
          </div>
        </div>
      </Dialog>

      {/* Add new dialog */}
      <Dialog
        isShown={creating}
        title="Thêm mới cấu hình SEO"
        width={1000}
        hasFooter={false}
        // onCloseComplete={() => setCreating(false)}
        // onConfirm={() => addNewConfig()}
      >
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <div className="flex flex-col gap-1 flex-1">
              <strong>Danh mục</strong>
              <SelectMenu
                title="Danh mục"
                options={categories}
                selected={form.category}
                closeOnSelect
                onSelect={(item) => setForm({ ...form, category: item.value })}
              >
                <Button>
                  {form.category
                    ? categories.find((c) => c.value === form.category)?.label
                    : "Chọn danh mục"}
                </Button>
              </SelectMenu>
              {errors["category"] && (
                <span className="text-red-500">{errors["category"]}</span>
              )}
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <strong>Trạng thái</strong>
              <SelectMenu
                title="Trạng thái"
                options={statuses}
                selected={form.status}
                closeOnSelect
                onSelect={(item) => setForm({ ...form, status: item.value })}
              >
                <Button>
                  {form.status
                    ? statuses.find((s) => s.value === form.status)?.label
                    : "Chọn trạng thái"}
                </Button>
              </SelectMenu>
              {errors["status"] && (
                <span className="text-red-500">{errors["status"]}</span>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col gap-1 flex-1">
              <strong>Đường dẫn</strong>
              <TextInput
                style={{ width: "100%" }}
                value={form.link}
                onChange={(e: any) => setForm({ ...form, link: e.target.value })}
              />
              {errors["link"] && (
                <span className="text-red-500">{errors["link"]}</span>
              )}
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <strong>Tiêu đề</strong>
              <TextInput
                style={{ width: "100%" }}
                value={form.title}
                onChange={(e: any) => setForm({ ...form, title: e.target.value })}
              />
              {errors["title"] && (
                <span className="text-red-500">{errors["title"]}</span>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col gap-1 flex-1">
              <strong>H1</strong>
              <TextInput
                style={{ width: "100%" }}
                value={form.h1}
                onChange={(e: any) => setForm({ ...form, h1: e.target.value })}
              />
              {errors["h1"] && (
                <span className="text-red-500">{errors["h1"]}</span>
              )}
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <strong>Hình ảnh</strong>
              <div className="flex flex-row gap-2">
                <TextInput
                  style={{ width: "100%" }}
                  value={form.thumbnail}
                  onChange={(e: any) =>
                    setForm({ ...form, thumbnail: e.target.value })
                  }
                />
                <Button appearance="primary" intent="primary">
                  Upload
                </Button>
              </div>
              {errors["thumbnail"] && (
                <span className="text-red-500">{errors["thumbnail"]}</span>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col gap-1 flex-1">
              <strong>Mô tả</strong>
              <Textarea
                style={{ width: "100%", height: "100px" }}
                value={form.description}
                onChange={(e: any) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
              {errors["description"] && (
                <span className="text-red-500">{errors["description"]}</span>
              )}
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <strong>Link liên quan</strong>
              <Textarea
                style={{ width: "100%", height: "100px" }}
                value={form.related_links}
                onChange={(e: any) =>
                  setForm({ ...form, related_links: e.target.value })
                }
              />
              {errors["related_links"] && (
                <span className="text-red-500">{errors["related_links"]}</span>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col gap-1 flex-1">
              <strong>Nội dung chân trang</strong>
              <Editor
                value={form.detail}
                onEditorChange={(editorContent) =>
                  setForm({ ...form, detail: editorContent })
                }
                apiKey="no-api-key"
                init={{
                  height: 500,
                  menubar: true,
                  plugins: [
                    "image",
                    "code",
                    "table",
                    "link",
                    "media",
                    "codesample",
                  ],
                  toolbar:
                    "undo redo | formatselect | " +
                    "bold italic backcolor | alignleft aligncenter " +
                    "alignright alignjustify | table | bullist numlist outdent indent | " +
                    "removeformat | code",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />
            </div>
          </div>
        </div>
        <div className="mt-5 flex gap-5 justify-end">
          <Button
            isLoading={loadingCreate}
            appearance="primary"
            intent="success"
            onClick={addNewConfig}
          >
            Thêm
          </Button>
          <Button onClick={() => setCreating(false)}>Hủy</Button>
        </div>
      </Dialog>

      {/* Filter side sheet */}
      <SideSheet
        isShown={filtering}
        shouldCloseOnOverlayClick={false}
        onCloseComplete={() => setFiltering(false)}
      >
        <div className="flex flex-col gap-3">
          <div className="px-3 py-5 border-b">
            <Heading size={600}>Lọc cấu hình</Heading>
          </div>

          <div className="p-3 flex flex-col gap-3">
            <div className="flex gap-3">
              <div className="flex flex-col gap-1 flex-1">
                <span>Danh mục</span>
                <div className="flex gap-1 items-center">
                  <div className="flex-grow flex flex-col">
                    <SelectMenu
                      title="Danh mục"
                      options={categories}
                      selected={filterForm.category}
                      closeOnSelect
                      onSelect={(item) =>
                        setFilterForm({ ...filterForm, category: item.value })
                      }
                    >
                      <Button>
                        {filterForm.category
                          ? categories.find(
                              (c) => c.value === filterForm.category
                            )?.label
                          : "Chọn danh mục"}
                      </Button>
                    </SelectMenu>
                  </div>

                  {filterForm.category && (
                    <Button
                      onClick={() =>
                        setFilterForm({ ...filterForm, category: undefined })
                      }
                    >
                      <CrossIcon />
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1 flex-1">
                <span>Trạng thái</span>
                <div className="flex gap-1 items-center">
                  <div className="flex-grow flex flex-col">
                    <SelectMenu
                      title="Trạng thái"
                      options={statuses}
                      selected={filterForm.status}
                      closeOnSelect
                      onSelect={(item) =>
                        setFilterForm({ ...filterForm, status: item.value })
                      }
                    >
                      <Button>
                        {filterForm.status
                          ? statuses.find((s) => s.value === filterForm.status)
                              ?.label
                          : "Chọn trạng thái"}
                      </Button>
                    </SelectMenu>
                  </div>

                  {filterForm.status && (
                    <Button
                      onClick={() =>
                        setFilterForm({ ...filterForm, status: undefined })
                      }
                    >
                      <CrossIcon />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <span>Đường dẫn</span>
              <TextInput
                style={{ width: "100%" }}
                value={filterForm.link}
                onChange={(e: any) =>
                  setFilterForm({ ...filterForm, link: e.target.value })
                }
              />
            </div>

            <div className="flex gap-2">
              <Button
                appearance="primary"
                intent="success"
                onClick={handleFilter}
              >
                Tìm kiếm
              </Button>
              <Button
                appearance="default"
                onClick={() => setFilterForm({ link: "" })}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </SideSheet>
    </div>
  );
}
