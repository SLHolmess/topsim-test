import {
  Button,
  Heading,
  Paragraph,
  SelectMenu,
  SideSheet,
  TextInput,
} from "evergreen-ui";
import React from "react";
import {
  maxPriceOptions,
  minPriceOptions,
  productCategories,
} from "src/constants/config";
import { filterEmptyValues } from "src/constants/shared";

const statuses = [
  { value: "0", label: "Bản nháp" },
  { value: "1", label: "Chờ duyệt" },
  { value: "2", label: "Công khai" },
];

const Filter = (props: any) => {
  const { isShown, setIsShown, handleDataSeo, filter, setFilter, initialFilter } = props;

  const cateOptions = productCategories.map((i) => ({
    label: i.text,
    value: i.id.toString(),
  }));


  const handleChangeForm = (key: string, value: any) => {
    switch (key) {
      case "category":
        setFilter((prev: any) => {
          return {
            ...prev,
            category: value,
          };
        });
        break;
      case "priceFrom":
        setFilter((prev: any) => {
          return {
            ...prev,
            priceFrom: value,
          };
        });
        break;
      case "priceTo":
        setFilter((prev: any) => {
          return {
            ...prev,
            priceTo: value,
          };
        });
        break;
      case "title":
        setFilter((prev: any) => {
          return {
            ...prev,
            title: value,
          };
        });
        break;
      case "h1":
        setFilter((prev: any) => {
          return {
            ...prev,
            h1: value,
          };
        });
        break;
      case "status":
        setFilter((prev: any) => {
          return {
            ...prev,
            status: value,
          };
        });
        break;
      default:
        break;
    }
  };

  const handleFilter = async () => {
    const payload = filterEmptyValues(filter);

    const params = new URLSearchParams(payload);

    handleDataSeo(params);

    setIsShown(false);
  };

  const handleReset = () => {
    setFilter(initialFilter);
  };

  return (
    <div>
      <SideSheet isShown={isShown} onCloseComplete={() => setIsShown(false)}>
        <div className="px-3 py-5 border-b">
          <Heading size={600}>Lọc cấu hình sản phẩm</Heading>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <strong>Danh mục</strong>
              <SelectMenu
                title="Category"
                options={cateOptions}
                closeOnSelect
                selected={filter.category}
                onSelect={(item) => handleChangeForm("category", item.value)}
              >
                <Button width="100%">
                  {filter.category
                    ? cateOptions.find((c) => c.value === filter.category)
                        ?.label
                    : "Chọn danh mục"}
                </Button>
              </SelectMenu>
            </div>
            <div className="flex flex-col gap-2">
              <strong>Tiêu đề</strong>
              <TextInput
                value={filter?.title}
                onChange={(e: any) => handleChangeForm("title", e.target.value)}
                width="100%"
                placeholder="Nhập tiêu đề"
              />
            </div>
            <div className="flex flex-col gap-2">
              <strong>Trạng thái</strong>
              <SelectMenu
                title="Trạng thái"
                closeOnSelect
                options={statuses}
                selected={filter.status}
                onSelect={(item) => handleChangeForm("status", item.value)}
              >
                <Button width="100%">
                  {filter.status
                    ? statuses.find((s) => s.value === filter.status)?.label
                    : "Chọn trạng thái"}
                </Button>
              </SelectMenu>
            </div>
            <div className="flex flex-col gap-2">
              <strong>H1</strong>
              <TextInput
                value={filter?.h1}
                onChange={(e: any) => handleChangeForm("h1", e.target.value)}
                width="100%"
                placeholder="Nhập tiêu đề H1"
              />
            </div>
            <div className="flex flex-col gap-2">
              <strong>Khoảng giá</strong>
              <div className="flex gap-3">
                <div className="w-full">
                  <SelectMenu
                    title="Min Price"
                    closeOnSelect
                    options={minPriceOptions}
                    selected={filter.priceFrom}
                    onSelect={(item) =>
                      handleChangeForm("priceFrom", item.value)
                    }
                  >
                    <Button width="100%">
                      {filter.priceFrom
                        ? minPriceOptions.find(
                            (c) => c.value === filter.priceFrom
                          )?.label
                        : "Chọn min Price"}
                    </Button>
                  </SelectMenu>
                </div>
                -
                <div className="w-full">
                  <SelectMenu
                    title="Max Price"
                    closeOnSelect
                    options={maxPriceOptions}
                    selected={filter.priceTo}
                    onSelect={(item) => handleChangeForm("priceTo", item.value)}
                  >
                    <Button width="100%">
                      {filter.priceTo
                        ? maxPriceOptions.find(
                            (c) => c.value === filter.priceTo
                          )?.label
                        : "Chọn max Price"}
                    </Button>
                  </SelectMenu>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-10">
            <Button
              marginRight={16}
              appearance="primary"
              intent="success"
              onClick={handleFilter}
            >
              Áp dụng
            </Button>
            <Button marginRight={16} onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>
      </SideSheet>
    </div>
  );
};

export default Filter;
