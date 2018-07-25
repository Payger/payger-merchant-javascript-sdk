export default class Request {

	constructor() {
		this.methods = {
			post: "POST",
			get: "GET",
			put: "PUT",
			delete: "DELETE"
		};
	}

	post(token = null, url, data = {}) {
		return this.postOrPut(token, url, data, this.methods.post);
	}

	put(token = null, url, data = {}) {
		return this.postOrPut(token, url, data, this.methods.put);
	}

	get(token = null, url) {
		return this.getOrDelete(token, url, this.methods.get);
	}

	delete(token = null, url) {
		return this.getOrDelete(token, url, this.methods.delete);
	}

	postOrPut(token = null, url, data = {}){
		return fetch(url, {
			method: "POST", 
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				"authorization": "Bearer " + (token != null ? token : "cGF5Z2VyOg==")
			},
			body: JSON.stringify(data),
		}).then(response => response.json()) 
			.catch(error => error);    
	}

	getOrDelete(token, url) {
		return fetch(url, {
			method: "GET", 
			headers: {
				"Content-Type": "application/json",
				"authorization": "Bearer " + token
			}
		}).then(response => response.json())
			.catch(error => error);    
	}
}