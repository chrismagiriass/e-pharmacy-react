import { ApiClient } from "./client";

let apiClient = new ApiClient();

export default {


  post(customer) {
    return apiClient.post('customers', customer);
  },
  update(id, customer) {
    return apiClient.post('customers/' + id + '/update', customer);
  },
  get() {
    return apiClient.get('customers');
  },
  getById( id ) {
    return apiClient.get(`customers/${id}`);
  },
  getByUsername( username ) {
    return apiClient.get(`customers/username/${username}`);
  },
  deleteCustomer(id) {
    return apiClient.delete(`customers/${id}`);
  },
  uniqueEmail(email) {
    return apiClient.get(`customers/unique?email=${email}` );
  }


}