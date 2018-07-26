import endpointsConfig from './endpoints.js';

export default class Config {
	
	constructor(url, oauth2) {
		this.url = url,
		this.oauth2 = oauth2,
		this.endpoints = endpointsConfig
	}
}