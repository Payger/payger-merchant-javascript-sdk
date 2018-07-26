export default class Balances {

	constructor(request, config) {
		this.balancesUrl = config.url + config.endpoints.balances[0].url; 
		this.request = request;
	}
	/**
	 * @param {string} token 
	 */
	getBalances(token) {
		return this.request.get(token, this.balancesUrl);
	}
}