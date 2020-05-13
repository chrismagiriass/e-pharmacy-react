import { ApiClient } from "./client";

let apiClient = new ApiClient();

export default {


  post(product) {
    return apiClient.post('products', product);
  },
  update(id, product) {
    return apiClient.post('products/' + id + '/update', product);
  },
  get() {
    return apiClient.get('products');
  },
  deleteProduct(id) {
    return apiClient.delete(`products/${id}`);
  }

}