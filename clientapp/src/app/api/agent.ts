import axios, { AxiosResponse } from 'axios';
import { ILandProperty } from '../models/property';
import { history } from '../..';
import { toast } from 'react-toastify';

//axios.defaults.baseURL ='http://localhost:5000/api';

axios.defaults.baseURL=process.env. REACT_APP_API_URL

axios.interceptors.response.use(undefined, error =>{

    if(error.message === 'Network Error' && !error.response){
        toast.error('Network Error');
    }

    const {status,data, config} = error.response;

    if(status === 404){
        history.push('/notfound');
    }
    if(status === 400 && config.method ==='get' && data.console.errors.hasOwnProperty('id')){
        history.push('/notfound');
    }
    if(status === 500){
        toast.error('Server Error');
    }
}
);

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) => 
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));
    
const requests ={
    get: (url: string) => axios.get(url).then(responseBody),
    post:(url: string, body:{}) => axios.post(url, body).then(responseBody),
    put:(url: string, body:{}) => axios.put(url, body).then(responseBody),
    del:(url:string) => axios.delete(url).then(responseBody)
}

const LandProperties = {
    list: (): Promise<ILandProperty[]> => requests.get('/properties'),
    details: (id: string) => requests.get(`/properties/${id}`),
    create:(property: ILandProperty) => requests.post('properties', property),
    update:(property: ILandProperty) => requests.put(`/properties/${property.id}`, property),
    delete: (id: string) => requests.del(`/properties/${id}`)
}


export default{
    LandProperties
}