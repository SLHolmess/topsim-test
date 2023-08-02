import { Pagination } from "evergreen-ui";
import React from "react";
import { convertQueryParamsToObject } from "src/constants/shared";

const PaginationCustom = (props: any) => {
  const { pathname, searchParams, totalSim } = props;

  const baseUrl = window.location.origin;

  const paramObj = convertQueryParamsToObject(
    new URLSearchParams(searchParams)
  );

  const pagination = {
    page: paramObj?.page ? Number(paramObj?.page) : 1,
    totalRecord: totalSim,
  };

  const currentPage = paramObj.page ? Number(paramObj.page) : 1;

  const total = Number(pagination?.totalRecord?.replace(",", ""));

  const fromRecord = Math.floor(1 + (pagination.page - 1) * 60);
  const toRecord = Math.floor(pagination.page * 60);

  const totalPages = Math.ceil(total / 60);

  const handleNext = () => {
    const newParams: any = {
      ...paramObj,
      page: currentPage < totalPages ? currentPage + 1 : totalPages,
    };
    const paramConverted = new URLSearchParams(newParams).toString();

    const url = `${baseUrl}${pathname}?${paramConverted}`;

    if (typeof window !== "undefined") {
      window.location.href = url;
    }
  };

  const handlePrev = () => {
    const newParams: any = {
      ...paramObj,
      page: currentPage > 1 ? currentPage - 1 : currentPage,
    };
    const paramConverted = new URLSearchParams(newParams).toString();

    const url = `${baseUrl}${pathname}?${paramConverted}`;

    if (typeof window !== "undefined") {
      window.location.href = url;
    }
  };

  const handleChangePage = (page: any) => {
    const newParams = {
      ...paramObj,
      page: page,
    };
    const paramConverted = new URLSearchParams(newParams).toString();

    const url = `${baseUrl}${pathname}?${paramConverted}`;

    if (typeof window !== "undefined") {
      window.location.href = url;
    }
  };

  return (
    <div className="flex flex-col items-center my-3">
      {totalPages > 0 && (
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onNextPage={handleNext}
          onPreviousPage={handlePrev}
          onPageChange={handleChangePage}
        />
      )}
    </div>
  );
};

export default PaginationCustom;
