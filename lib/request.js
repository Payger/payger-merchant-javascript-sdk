import { config } from '../config';

export default class Request {
    post(token = null, url, data = {}){
        return await fetch(url, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "authorization": "Bearer " + (token != null ? token : "cGF5Z2VyOg==")
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json()) 
        .catch(error => console.error(`Fetch Error =\n`, error));    
    }

    get(token, url) {
        return await fetch(url, {
            method: "GET", 
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + token
            }
        })
        .then(response => response.json())
        .catch(error => console.error(`Fetch Error =\n`, error));    
    }
}