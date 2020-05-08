import CustomerService from "../services/customerService";
// import { showErrorAlert} from "./AlertActions";


export const getCustomers = () => {
    return (dispatch) => {

        // dispatch({type: SHOW_SPINNER})

        CustomerService.get().then(response => {
            if (response.status === 200) {
                // dispatch({type: HIDE_SPINNER})
                dispatch({
                    // type: GET_USERS,
                    customers: response.data,
                })

            } else {
                // dispatch({type: HIDE_SPINNER})
                // showErrorAlert(dispatch, 'failed operation')
              
            }
        }, error => {
            // dispatch({type: HIDE_SPINNER})
            // showErrorAlert(dispatch, 'failed operation' + error.toString())
             
        })
    }
}
