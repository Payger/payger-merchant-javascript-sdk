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
			productCurrency*: string
			paymentCurrencies: string
		}
		* mandatory
	*/
	getExchangeRates(token, criteria) {
		let url = this.exchangeRatesUrl + "?amount=" + criteria.amount;
		if(criteria.applyLimits && criteria.applyLimits != null && criteria.applyLimits != "") {
			url += "&applyLimits=" + criteria.applyLimits;
		}
		url += "&productCurrency=" + criteria.productCurrency;
		if(criteria.paymentCurrencies && criteria.paymentCurrencies != null && criteria.paymentCurrencies != "") {
			url += "&paymentCurrencies=" + criteria.paymentCurrencies;
		}
		const response = this.request.get(token, url);

		return response;
	}
}
