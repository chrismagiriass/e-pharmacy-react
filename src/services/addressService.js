import { ApiClient } from "./client";

let apiClient = new ApiClient();

export default {

  post(address) {
    return apiClient.post('address', address);
  },
//   update(id, address) {
//     return apiClient.post('address/' + id + '/update', address);
//   },
  get() {
    return apiClient.get('address');
  },
  deleteCustomer(id) {
    return apiClient.delete(`address/${id}`);
  }

}