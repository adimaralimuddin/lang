
import axios from "axios";


export async function apiRequest({ }) {
    var options = {
        method: 'GET',
        url: 'https://microsoft-translator-text.p.rapidapi.com/languages',
        params: { 'api-version': '3.0' },
        headers: {
            'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
            'X-RapidAPI-Key': 'aff1177afamsh1fb255402c24c5ap1be9e4jsn4efe400f2d7e'
        }
    };

    const res = await axios.request(options)
    return res
}

export async function apiGetAllLanguages() {
    var options = {
        method: 'GET',
        url: 'https://microsoft-translator-text.p.rapidapi.com/languages',
        params: { 'api-version': '3.0' },
        // responseType: 'blob',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
            'X-RapidAPI-Key': 'aff1177afamsh1fb255402c24c5ap1be9e4jsn4efe400f2d7e',
        }
    };

    const res = await axios.request(options)
    const data = res.data
    return data
}