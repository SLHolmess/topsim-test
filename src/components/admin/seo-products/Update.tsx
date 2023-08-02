import { Editor } from "@tinymce/tinymce-react";
import {
  Button,
  Dialog,
  Heading,
  SelectMenu,
  TextInput,
  toaster,
} from "evergreen-ui";
import React from "react";
import {
  maxPriceOptions,
  minPriceOptions,
  productCategories,
} from "src/constants/config";
import SEOProductService from "src/helpers/client/services/seo-config";

const statuses = [
  { value: "0", label: "Bản nháp" },
  { value: "1", label: "Chờ duyệt" },
  { value: "2", label: "Công khai" },
];

const Update = (props: any) => {
  const { isOpen, setOpen, handleDataSeo, data } = props;

  const [valueForm, setValueForm] = React.useState<any>({
    category: null,
    priceFrom: null,
    priceTo: null,
    title: "",
    h1: "",
    description: "",
    status: null,
  });
  const [error, setError] = React.useState<any>();

  const handleChangeForm = (key: string, value: any) => {
    switch (key) {
      case "category":
        setValueForm((prev: any) => {
          return {
            ...prev,
            category: value,
          };
        });
        break;
      case "priceFrom":
        setValueForm((prev: any) => {
          return {
            ...prev,
            priceFrom: value,
          };
        });
        break;
      case "priceTo":
        setValueForm((prev: any) => {
          return {
            ...prev,
            priceTo: value,
          };
        });
        break;
      case "title":
        setValueForm((prev: any) => {
          return {
            ...prev,
            title: value,
          };
        });
        break;
      case "h1":
        setValueForm((prev: any) => {
          return {
            ...prev,
            h1: value,
          };
        });
        break;
      case "status":
        setValueForm((prev: any) => {
          return {
            ...prev,
            status: value,
          };
        });
        break;
      case "description":
        setValueForm((prev: any) => {
          return {
            ...prev,
            description: value,
          };
        });
        break;
      default:
        break;
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await SEOProductService.putUpdate(data?._id, valueForm);
      if (res.success) {
        toaster.success("Cập nhật cấu hình SEO thành công");
        setOpen(false);
        handleDataSeo();
      } else {
        toaster.danger(res.message || "Failed to update");
        setError(res?.data);
      }
    } catch (error: any) {
      toaster.danger(error?.response?.data?.message || "Failed to update");
    }
  };

  const cateOptions = productCategories.map((i) => ({
    label: i.text,
    value: i.id.toString(),
  }));

  React.useEffect(() => {
    setValueForm({
      category: data?.category,
      priceFrom: data?.priceFrom?.toString(),
      priceTo: data?.priceTo?.toString(),
      title: data?.title,
      description: data?.description,
      status: data?.status?.toString(),
      h1: data?.h1,
    });
  }, [data]);

  return (
    <Dialog
      width={800}
      isShown={isOpen}
      title="Chỉnh sửa cấu hình SEO sản phẩm"
      onCloseComplete={() => setOpen(false)}
      confirmLabel="Cập nhật"
      cancelLabel="Đóng"
      onConfirm={handleUpdate}
    >
      {data?.category !== "0" && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-1">Danh mục</h4>
            <SelectMenu
              title="Category"
              options={cateOptions}
              closeOnSelect
              selected={valueForm.category}
              onSelect={(item) => handleChangeForm("category", item.value)}
            >
              <Button width="100%">
                {valueForm.category
                  ? cateOptions.find((c) => c.value === valueForm.category)
                      ?.label
                  : "Chọn danh mục"}
              </Button>
            </SelectMenu>
            {error?.category && (
              <div className="text-[#ff3300] text-xs italic">
                {error?.category?.msg}
              </div>
            )}
          </div>
          <div>
            <h4 className="font-semibold mb-1">Khoảng giá</h4>
            <div className="flex gap-3">
              <div className="w-full">
                <SelectMenu
                  title="Min Price"
                  closeOnSelect
                  options={minPriceOptions}
                  selected={valueForm.priceFrom}
                  onSelect={(item) => handleChangeForm("priceFrom", item.value)}
                >
                  <Button width="100%">
                    {valueForm.priceFrom
                      ? minPriceOptions.find(
                          (c) => c.value === valueForm.priceFrom
                        )?.label
                      : "Chọn min Price"}
                  </Button>
                </SelectMenu>
                {error?.priceFrom && (
                  <div className="text-[#ff3300] text-xs italic">
                    {error?.priceFrom?.msg}
                  </div>
                )}
              </div>
              -
              <div className="w-full">
                <SelectMenu
                  title="Max Price"
                  closeOnSelect
                  options={maxPriceOptions}
                  selected={valueForm.priceTo}
                  onSelect={(item) => handleChangeForm("priceTo", item.value)}
                >
                  <Button width="100%">
                    {valueForm.priceTo
                      ? maxPriceOptions.find(
                          (c) => c.value === valueForm.priceTo
                        )?.label
                      : "Chọn max Price"}
                  </Button>
                </SelectMenu>
                {error?.priceTo && (
                  <div className="text-[#ff3300] text-xs italic">
                    {error?.priceTo?.msg}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4 mt-3">
        <div>
          <h4 className="font-semibold mb-1">Trạng thái</h4>
          <SelectMenu
            title="Trạng thái"
            closeOnSelect
            options={statuses}
            selected={valueForm.status}
            onSelect={(item) => handleChangeForm("status", item.value)}
          >
            <Button width="100%">
              {valueForm.status
                ? statuses.find((s) => s.value === valueForm.status)?.label
                : "Chọn trạng thái"}
            </Button>
          </SelectMenu>
          {error?.status && (
            <div className="text-[#ff3300] text-xs italic">
              {error?.status?.msg}
            </div>
          )}
        </div>
      </div>
      <div className="my-3">
        <h4 className="font-semibold mb-1">Tiêu đề</h4>
        <TextInput
          value={valueForm?.title}
          onChange={(e: any) => handleChangeForm("title", e.target.value)}
          width="100%"
          placeholder="VD: Sim Tam Hoa giá từ 1.000.000 đến 3.000.000"
        />
        {error?.title && (
          <div className="text-[#ff3300] text-xs italic">
            {error?.title?.msg}
          </div>
        )}
      </div>
      <div className="mb-3">
        <h4 className="font-semibold mb-1">H1</h4>
        <TextInput
          value={valueForm?.h1}
          onChange={(e: any) => handleChangeForm("h1", e.target.value)}
          width="100%"
          placeholder="VD: 0999999999 Sim Vip giá từ 1.000.000 đến 3.000.000"
        />
        {error?.h1 && (
          <div className="text-[#ff3300] text-xs italic">{error?.h1?.msg}</div>
        )}
      </div>
      <div>
        <h4 className="font-semibold mb-1">Mô tả</h4>
        <TextInput
          type="textarea"
          value={valueForm?.description}
          onChange={(e: any) => handleChangeForm("description", e.target.value)}
          width="100%"
          placeholder=""
        />
        {error?.description && (
          <div className="text-[#ff3300] text-xs italic">
            {error?.description?.msg}
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default Update;
