import { ApiClient } from "./client";

let apiClient = new ApiClient();

export default {


  post(category) {
    return apiClient.post('productcategories', category);
  },
  update(id, category) {
    return apiClient.post('productcategories/' + id + '/update', category);
  },
  get() {
    return apiClient.get('productcategories');
  },
  getById( id ) {
    return apiClient.get(`productcategories/${id}`);
  },

  deleteCategory(id) {
    return apiClient.delete(`productcategories/${id}`);
  }
}