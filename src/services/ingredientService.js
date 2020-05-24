import { ApiClient } from "./client";

let apiClient = new ApiClient();

export default {


  post(ingredient) {
    return apiClient.post('ingredients', ingredient);
  },
  update(id, ingredient) {
    return apiClient.post('ingredients/' + id + '/update', ingredient);
  },
  get( conf = {} ) {
    return apiClient.get('ingredients',conf);
  },
  getById( id ) {
    return apiClient.get(`ingredients/${id}`);
  },
  deleteIngredient(id) {
    return apiClient.delete(`ingredients/${id}`);
  }

}