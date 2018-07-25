import { request } from "./request";
import { config } from "../config";

export default class TokenManager {

	constructor(){
		this.token = null;
		this.refreshToken = null;
		this.expiresIn = null;
		this.token = config.endpoints.token[0];
	}

	generateNewToken(apiKey, apiSecret) {
		try {
			const data = {
				grant_type: "password",
				username: apiKey,
				password: apiSecret,
				client_id: "payger",
				scope: ""
			};
			const response = request.post(null, this.token.url, data);

			this.token = response.access_token;
			this.refreshToken = response.refresh_token;
			this.expiresIn = response.expires_in;
		} catch(error) {
			this.token = null;
			this.refreshToken = null;
			this.expiresIn = null;
		}
	}

	generateRefreshedToken(apiKey, apiSecret) {
		try {
			const data = { 
				grant_type: "refresh_token",
				username: apiKey,
				password: apiSecret,
				client_id: "payger",
				refresh_token: this.refreshToken
			};
			const response = request.post(null, this.token.url, data);

			this.token = response.access_token;
			this.refreshToken = response.refresh_token;
			this.expiresIn = new Date(Date.now() + response.expires_in);
		} catch(error) {
			this.token = null;
			this.refreshToken = null;
			this.expiresIn = null;
		}
	}

	isGeneratedToken() {
		return this.token != null;
	}

	getCurrentToken() {
		return this.token;
	}

	checkIfTokenExpired() {
		return Date.now() > this.expiresIn.getMilliseconds();
	}

}