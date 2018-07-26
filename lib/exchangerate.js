export default class Balances {

	constructor(request, config) {
		this.exchangeRatesUrl = config.url + config.endpoints.exchangeRates[0].url; 
		this.request = request;
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
		
		const response = this.request.get(token, url);

		return response;
	}
}
