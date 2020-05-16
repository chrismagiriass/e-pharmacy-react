import axios from 'axios';
    export default {

        login(user) {
            const token = Buffer.from(`${user.username}:${user.password}`, 'utf8').toString('base64')
         return axios({
                method: 'post',
                url: 'http://localhost:8080/pharmacy/login',
                data: user,
                credentials: 'include', 
                headers: {
                    'content-type': `application/json`,
                    Authorization : `Basic ${token}`
                },
            })
        }
    }