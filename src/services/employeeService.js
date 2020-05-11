import { ApiClient } from "./client";

let apiClient = new ApiClient();

export default {


    post(employee) {
        return apiClient.post('employees', employee);
    },
    update(id, employee) {
        return apiClient.post('employees/' + id + '/update', employee);
    },
    get() {
        return apiClient.get('employees');
    },
    deleteEmployee(id) {
        return apiClient.delete(`employees/${id}`);
    },
    // uniqueEmail(data) {
    //     return apiClient.post('employees/unique', data);
    // }


}