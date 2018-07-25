import { config } from "../config";
import { request } from "./request";

export default class Balances {

	constructor() {
		this.currencies = config.endpoints.currencies;
		this.currenciesUrl = config.url + this.currencies[0].uri; 
	}

	/**
	 * @param {string} from 
	 */
	getCurrencies(token, from = null) {
		const url = from != null ? this.currenciesUrl + "?from=" + from : this.currenciesUrl; 
		return request.get(token, url);
	}

	/**
	 * @param {string} currency 
	 */
	getCurrency(token, currency) {
		return request.get(token, this.currenciesUrl + "/" + currency);
	}
}