import { ApiClient } from "./client";

let apiClient = new ApiClient();

export default {


  post(customer) {
    return apiClient.post('customers', customer);
  },
  update(id, user) {
    return apiClient.post('users/' + id + '/update', user);
  },
  get() {
    return apiClient.get('customers');
  },
  deleteCustomer(id) {
    return apiClient.delete(`customers/${id}`);
  },
  uniqueEmailandUsername(data) {
    return apiClient.post('customers/unique', data);
  }


}