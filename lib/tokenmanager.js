import  qs from "qs";

export default class TokenManager {

	constructor(request, config, basicAuth){
		this.url = config.url + config.endpoints.token[0].url;
		this.request = request;
		this.basicAuth = basicAuth;
	}

	async generateNewToken(apiKey, apiSecret) {
		try {
			const data = {
				grant_type: "password",
				username: apiKey,
				password: apiSecret
			};
			const response = await this.request.post(null, this.url, this.basicAuth, qs.stringify(data), "application/x-www-form-urlencoded");
			
			return {
				token: response.access_token,
				refreshToken: response.refresh_token,
				expiresIn: Date.now() + response.expires_in
			};

		} catch(error) {
			return {
				token: null,
				refreshToken: null,
				expiresIn: null
			};
		}
	}

	generateRefreshedToken(apiKey, apiSecret) {
		try {
			const data = { 
				grant_type: "refresh_token",
				username: apiKey,
				password: apiSecret,
				refresh_token: this.refreshToken
			};
			const response = this.request.post(null, this.url, this.basicAuth, qs.stringify(data), "application/x-www-form-urlencoded");

			return {
				token: response.access_token,
				refreshToken: response.refresh_token,
				expiresIn: response.expires_in
			};

		} catch(error) {
			return {
				token: null,
				refreshToken: null,
				expiresIn: null
			};
		}
	}

	isGeneratedToken(token) {
		return token != null;
	}

	checkIfTokenExpired(expiresIn) {
		return Date.now() > expiresIn;
	}

}