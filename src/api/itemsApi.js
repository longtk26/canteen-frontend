import axios from 'axios';
import { BASE_URL, LOCAL_URL, configHeader } from "./configApi";

class ItemApi{
    async createMainDish({token, clientId}, data){
        try {
            const res = await axios.post(`${BASE_URL}/items/new`, data, {headers: configHeader({token, clientId})})
            return res.data;
        } 
        catch (error) {
            console.log(error);
            return {
                error: true,
                response: error?.response,
            };
        }
    }

    async updateItem({token, clientId}, data){
        try {
            const res = await axios.patch(`${BASE_URL}/items/${data.itemId}`, data.item_quantity, 
            {headers: configHeader({token, clientId})})
            return res.data;
        } 
        catch (error) {
            console.log(error);
            return {
                error: true,
                response: error?.response,
            };
        }
    }

    async deleteItem({token, clientId}, itemId){
        try {
            const res = await axios.delete(`${BASE_URL}/items/${itemId}`, {headers: configHeader({token, clientId})})
            return res.data;
        } 
        catch (error) {
            console.log(error);
            return {
                error: true,
                response: error?.response,
            };
        }
    }

    async getItemsByType({token, clientId}, type){
        try {
            const res = await axios.get(`${BASE_URL}/items/${type}`, {headers: configHeader({token, clientId})})
            return res.data;
        } 
        catch (error) {
            console.log(error);
            return {
                error: true,
                response: error?.response,
            };
        }
    }

    async deleteAllMainItem({token, clientId}){
        try {
            const res = await axios.delete(`${BASE_URL}/items/main/delete`, {headers: configHeader({token, clientId})})
            return res.data;
        } 
        catch (error) {
            console.log(error);
            return {
                error: true,
                response: error?.response,
            };
        }
    }
}

export default new ItemApi();