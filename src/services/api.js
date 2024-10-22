import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'https://api-faisca.online/Astrokids'
    //baseURL: 'http://192.168.0.8:5258'
    //baseURL: 'http://172.20.10.3:5019'

});
httpClient.interceptors.request.use(
    async (config) => {
        console.log(config)
        return config;
    },
    (error) => {

    }
);


httpClient.interceptors.response.use(async (response) => {
    console.log(response)
    return response
}, async (error) => {
    console.log(error.response)
    return error.response;
})
export default httpClient;