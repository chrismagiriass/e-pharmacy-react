import { ApiClient } from "./client";

let apiClient = new ApiClient();

export default {


  post(product) {
    return apiClient.post('products', product);
  },
  update(id, product) {
    return apiClient.post('products/' + id + '/update', product);
  },
  get( conf = {} ) {
    return apiClient.get('products',conf);
  },
  getById( id ) {
    return apiClient.get(`products/${id}`);
  },
  deleteProduct(id) {
    return apiClient.delete(`products/${id}`);
  },
  search(filters,conf = {} ) {
    return apiClient.post('products/search', filters,conf);
  }

}