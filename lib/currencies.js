export default class Balances {

	constructor(request, config) {
		this.currenciesUrl = config.url + config.endpoints.currencies[0].url; 
		this.request = request;
	}

	/**
	 * @param {string} from 
	 */
	getCurrencies(token, from = null) {
		const url = from != null ? this.currenciesUrl + "?from=" + from : this.currenciesUrl; 
		return this.request.get(token, url);
	}

	/**
	 * @param {string} currency 
	 */
	getCurrency(token, currency) {
		return this.request.get(token, this.currenciesUrl + "/" + currency);
	}
}