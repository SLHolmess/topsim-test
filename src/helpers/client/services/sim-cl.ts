import Axios from "../axios";
import { API_ENDPOINT, API_VALUATION } from "./apis";

const SimCLService = {
  async getSimClient(params: any) {
    const {
      type,
      head,
      tail,
      middle,
      gte,
      loadMore,
      lte,
      telco,
      category,
      catId,
      link,
      page,
      sort,
      pn,
      searchClient,
    } = params;

    const queryLink = link ? `link=${link}` : "";

    const queryMinPrice = gte ? `&gte=${gte}` : "";

    const queryTelco = telco ? `&telco=${telco}` : "";
    const queryHead = head ? `&head=${head}` : "";

    const queryMaxPrice = lte ? `&lte=${lte}` : "";
    const queryCategory = category ? `&category=${category}` : "";
    const queryLoadMore = loadMore ? `&loadMore=${loadMore}` : "";
    const queryCatId = catId ? `&catId=${catId}` : "";
    const queryTail = tail ? `&tail=${tail}` : "";
    const queryMiddle = middle ? `&middle=${middle}` : "";

    const queryPage = page ? `&page=${page}` : "";
    const querySort = sort ? `&sort=${sort}` : "";
    const queryPn = pn ? `&pn=${pn}` : "";

    const configApi = `${API_ENDPOINT}${type}${
      type === "search" ? "/query" : ""
    }?${queryLink}${queryTelco}${queryMinPrice}${queryHead}${queryMaxPrice}${queryCategory}${queryCatId}${queryTail}${queryMiddle}${queryLoadMore}${queryPage}${querySort}${queryPn}${
      searchClient ? `${searchClient}` : ""
    }`;

    const res = await Axios.get(configApi);

    return res.data;
  },

  async getValuation(sim: string) {
    const res = await Axios.get(`${API_VALUATION}/index?sim=${sim}`);

    return res.data;
  },
};

export default SimCLService;
