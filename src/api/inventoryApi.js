import axios from "axios";
import { BASE_URL, LOCAL_URL, configHeader } from "./configApi";

class InventoryApi{
    async createInventoryItem({token, clientId}, data){
        try {
            const res = await axios.post(`${BASE_URL}/inventoryItems/new/`, data, {headers: configHeader({ token, clientId })})
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

    async getAllInventoryItems({token, clientId}){
        try {
            const res = await axios.get(`${BASE_URL}/inventoryItems/all`, {headers: configHeader({ token, clientId })});
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

    async createGoodReceiveNote({token, clientId}, data){
        try {
            const res = await axios.post(`${BASE_URL}/inventoryAct/come`, data, {headers: configHeader({ token, clientId })})
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

    async getAllGoodReceiveNotes({token, clientId}){
        try {
            const res = await axios.get(`${BASE_URL}/inventoryAct/allcomevoucher`, {headers: configHeader({ token, clientId })})
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

    async deleteInventoryItems({token, clientId}, data){
        try {
            const res = await axios.post(`${BASE_URL}/inventoryAct/delete`, data, {headers: configHeader({ token, clientId })})
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

    async getAllDeletedInventoryItems({token, clientId}){
        try {
            const res = await axios.get(`${BASE_URL}/inventoryAct/alldeletevoucher`, {headers: configHeader({ token, clientId })})
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

    async createGoodDeliveryNote({token, clientId}, data){
        try {
            const res = await axios.post(`${BASE_URL}/inventoryAct/leave`, data, {headers: configHeader({ token, clientId })})
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

    async getAllGoodDeliveryNotes({token, clientId}){
        try {
            const res = await axios.get(`${BASE_URL}/inventoryAct/allleavevoucher`, {headers: configHeader({ token, clientId })})
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

    async getAllExpiredProduct({token, clientId}){
        try {
            const res = await axios.get(`${BASE_URL}/inventoryItems/expired`, {headers: configHeader({ token, clientId })})
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

export default new InventoryApi()