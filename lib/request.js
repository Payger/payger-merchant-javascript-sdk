import Fetch from 'isomorphic-fetch';
import Base64 from "base-64";

export default class Request {

	constructor() {
		this.methods = {
			post: "POST",
			get: "GET",
			put: "PUT",
			delete: "DELETE"
		};
	}

	post(token = null, url, basicAuth = null, data = {}, contentType = "application/json; charset=utf-8") {
		return this.postOrPut(token, url, basicAuth, data, this.methods.post, contentType);
	}

	put(token = null, url, data = {}) {
		return this.postOrPut(token, url, data, this.methods.put, contentType);
	}

	get(token = null, url, contentType = "application/json; charset=utf-8") {
		return this.getOrDelete(token, url, this.methods.get, contentType);
	}

	delete(token = null, url) {
		return this.getOrDelete(token, url, this.methods.delete);
	}

	async postOrPut(token = null, url, basicAuth = null, data, method, contentType){
		const basicAuthorization = "Basic " + Base64.encode(basicAuth.user + ":" + basicAuth.psw);
		const headers = {
			"Content-Type": contentType,
			"Authorization": (token != null ? ("Bearer " + token) : basicAuthorization),
			"Cache-Control": "no-cache"
		};

		return await Fetch(url, {
			method: method, 
			headers: headers,
			body: data
		}).then(response => response.json())
			.catch(error => console.error("Fetch Error =\n", error));    
	}

	async getOrDelete(token, url, method) {
		return await Fetch(url, {
			method: method, 
			headers: {
				"Content-Type": "application/json",
				"authorization": "Bearer " + token
			}
		}).then(response => response.json())
			.catch(error => console.error("Fetch Error =\n", error));     
	}
}