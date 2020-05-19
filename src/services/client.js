import axios from 'axios';

const getClientAxios = () => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const options = {
        baseURL: 'http://localhost:8080/pharmacy/api',
        credentials: 'include',
        headers: {
            Accept: 'application/json'
        }
    };
   

    
    if (currentUser !== null) {
        let  token = Buffer.from(`${currentUser.username}:${currentUser.password}`, 'utf8').toString('base64');
        options.headers={...options.headers,
            Authorization: `Basic ${token}`
        }    
    }

 
    const clientAxios = axios.create(options);
    return clientAxios;
};

export class ApiClient {

    constructor() {
        this.client = getClientAxios();
    }


    get(url, conf = {}) {
        return this.client.get(url, conf)
            .then(response => Promise.resolve(response.data))
            .catch(error => Promise.reject(error));
    }

    delete(url, conf = {}) {
        return this.client.delete(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    }
    // 
    post(url, data = {}, conf = {}) {
        return this.client.post(url, data, conf)
            .then(response => Promise.resolve(response.data))
            .catch(error => Promise.reject(error));
    }

    put(url, data = {}, conf = {}) {
        return this.client.put(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    }

}