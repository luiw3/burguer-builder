import axios from 'axios';

const instance = axios.create({
    baseURL:'https://react-burguer-builder-59d93.firebaseio.com/',

})

export default instance;