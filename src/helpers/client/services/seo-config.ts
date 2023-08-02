import Axios from "../axios"
import { API_SEO_PRODUCT, API_SEO_STATIC } from "./apis"

const SEOProductService = {
  async getList(params?: string) {
    const res = await Axios.get(`${API_SEO_PRODUCT}${params ? `?${params}` : ''}`)

    return res.data
  },

  async postCreate(payload: any) {
    const res = await Axios.post(API_SEO_PRODUCT, payload)

    return res.data
  },

  async putUpdate(id: any, payload: any) {
    const res = await Axios.put(`${API_SEO_PRODUCT}/${id}`, payload)

    return res.data
  },

  async deleteSeo(id: any) {
    const res = await Axios.delete(`${API_SEO_PRODUCT}/${id}`)

    return res
  }
}

export const SEOsStaticService = {
  async getConfigs(params?: string) {
    const res = await Axios.get(`${API_SEO_STATIC}${params ? `?${params}` : ''}`)

    return res.data
  }
}

export default SEOProductService