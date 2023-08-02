import { API_SEO } from "./apis";
import Axios from 'axios';

export const SeoService = {
  async getContent(params: any) {
    const { catId, link, type } = params;

    const qrCatId = catId ? `catId=${catId}` : "";
    const qrType = type ? `type=${type}` : "";

    const qrLink = link ? `&link=${link}` : "";

    const apiConfig = `${API_SEO}/static-configs/view?${qrCatId}${qrType}${qrLink}`;
    console.log(apiConfig);
    
    const res = await Axios.get(apiConfig);

    return res.data;
  },
};

export default SeoService;
