import axios, { AxiosResponse } from 'axios';
import { ILandProperty } from '../models/property';

axios.defaults.baseURL ='http://localhost:5000/api';

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