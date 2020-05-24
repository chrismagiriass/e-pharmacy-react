import { ApiClient } from "./client";

let apiClient = new ApiClient();

export default {


  post(order) {
    return apiClient.post('orders', order);
  },
  update(id, order) {
    return apiClient.post('orders/' + id + '/update', order);
  },
  get( conf = {} ) {
    return apiClient.get('orders',conf);
  },
  getById( id ) {
    return apiClient.get(`orders/${id}`);
  },
  getByEmail( email ) {
    return apiClient.get(`orders/email/${email}`);
  }
}