import axios from 'axios';
import chat from '../components/chat/chat';

    export default {

       
        login(user) {

                // this.state = {
                //   username: "",
                //   user: null,
                  
                // };   
    


            chat
            .login(this.state.username)
            .then(user => {
              this.setState({
                user
              });
            })
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