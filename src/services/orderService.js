import { ApiClient } from "./client";

let apiClient = new ApiClient();

export default {


  post(product) {
    return apiClient.post('orders', product);
  },
  update(id, product) {
    return apiClient.post('orders/' + id + '/update', product);
  },
  get( conf = {} ) {
    return apiClient.get('orders',conf);
  },
  getById( id ) {
    return apiClient.get(`orders/${id}`);
  },
  deleteProduct(id) {
    return apiClient.delete(`orders/${id}`);
  }

}