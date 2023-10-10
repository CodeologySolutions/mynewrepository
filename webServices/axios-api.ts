import axios from 'axios';
import * as generalSetting from './generalSetting'
import { saveDataToLocalStorage,retrieveDataFromLocalStorage } from '../appUtils/sessionManager';
import { Constants } from '../appUtils/constants';
// const instance = axios.create({
//     baseURL: generalSetting.API_URL,
// });

// export default instance;

//var header = localStorage.getItem('token') ? {'x-access-token': localStorage.getItem('token') } : {"user-type": "appUser"};
var header ={"user-type": "appUser"};
//var token  =  retrieveDataFromLocalStorage(Constants.key_token);
//var header = global.token ? {'x-access-token': global.token } : {"user-type": "appUser"};
console.log("header==>",header);
const instance = axios.create({
    baseURL: generalSetting.API_URL,
    timeout: 150000,
    headers: header
});

instance.interceptors.request.use(function (config) {
    if (!!config.data) {
        for (let key of Object.keys(config?.data)) {
            if (config.data[key] === "")
                config.data[key] = null
        }
    }
    return config;
}, function (error) {
    return error //Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.status === 200) {
        return response.data;
    }
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if(error.response?.statusText === "Unauthorized"){
        //localStorage.clear();
       // window.location.href = '/login';
    }
    return error?.response;
});

export default instance;