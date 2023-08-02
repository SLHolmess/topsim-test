import { API_ORDER_REQUEST, API_SEARCH } from "src/helpers/client/services/apis";
import { API_ENDPOINT, API_HOME_PAGE } from "./apis";
import Axios from "./axios";

const SimService = {
  async getSim(params: any) {
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
      sortBy,
      direction,
      searchClient
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
    const querySort = sortBy ? `&sortBy=${sortBy}` : "";
    const queryDirection = direction ? `&direction=${direction}` : ""; 

    const configApi = `${API_ENDPOINT}${type}${
      type === "search" ? "/query" : ""
    }?${queryLink}${queryTelco}${queryMinPrice}${queryHead}${queryMaxPrice}${queryCategory}${queryCatId}${queryTail}${queryMiddle}${queryLoadMore}${queryPage}${querySort}${queryDirection}${searchClient ? `${searchClient}` : ""}`;

    console.log('AAA', configApi)

    const res = await Axios.get(configApi);

    return res.data;
  },

  async getDataHome () {
    const start = Date.now();
    const res = await Axios.get(API_HOME_PAGE)
    
    console.log(`Load homepage data: ${Date.now() - start}`);
    return res.data
    
  },


  async getSimDetail (id: string) {
    const res = await Axios.get(`${API_ENDPOINT}detail/index?sim=${id}`)

    return res.data
    
  },

  async postOrderSim(body: any) {
    const res = await Axios.post(`${API_ORDER_REQUEST}`, body)

    return res.data;
  },

  async getSearch(params: any) {
    const { keyword, link } = params;

    const queryKeyword = keyword ? `keyword=${keyword}` : "";
    const queryLink = link ? `${keyword ? "&" : ""}link=${link}` : ""

    const configApi = `${API_SEARCH}?${queryKeyword}${queryLink}`

    const res = await Axios.get(configApi);

    return res.data
  },

  async getPhongThuy(paramString: string) {

    const configApi = `${API_ENDPOINT}phong-thuy/search-sim${paramString}`

    const res = await Axios.get(configApi)

    return res.data.data
  },

  async getBoiPhongThuy(paramString: string) {
    const configApi = `${API_ENDPOINT}phong-thuy/boi-sim${paramString}`
    
    const res = await Axios.get(configApi)

    return res.data.data

  }

};

export default SimService;
