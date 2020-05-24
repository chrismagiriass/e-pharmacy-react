import { ApiClient } from "./client";

let apiClient = new ApiClient();

export default {


  post(review) {
    return apiClient.post('reviews', review);
  },

  get() {
    return apiClient.get('reviews');
  },
  getById( id ) {
    return apiClient.get(`reviews/${id}`);
  },

  getByProduct( id ) {
    return apiClient.get(`reviews/product/${id}`);
  },
  deletereview(id) {
    return apiClient.delete(`reviews/${id}`);
  }
}