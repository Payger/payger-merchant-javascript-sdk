import { config } from "../config";
import { request } from "./request";

export default class Balances {

	constructor() {
		this.exchangeRates = config.endpoints.exchangeRates[0];
		this.exchangeRatesUrl = config.url + this.exchangeRates.uri; 
	}
	
	/**
	 * 
	 * @param {criteria} criteria 
		criteria {
			amount*: string  
			applyLimits: string (Default value: false)
			from*: string
			to: string
		}
		* mandatory
	*/
	getExchangeRates(token, criteria) {
		let url = this.exchangeRatesUrl + "?amount=" + criteria.amount;
		if(criteria.applyLimits && criteria.applyLimits != null && criteria.applyLimits != "") {
			url += "&applyLimits=" + criteria.applyLimits;
		}
		url += "&from=" + criteria.from;
		if(criteria.to && criteria.to != null && criteria.to != "") {
			url += "&to=" + criteria.to;
		}
		
		const response = request.get(token, url);

		return response;
	}
}
