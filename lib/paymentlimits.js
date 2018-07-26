export default class PaymentLimits {

	constructor(request, config) {
		this.paymentLimitsUrl = config.url + config.endpoints.paymentLimits[0].url; 
		this.request = request;
	}
	
	/**
	 * @param {string} token 
	 * @param {object} currencies
	   {
		   inputCurrency: {string}
		   outputCurrency: {string}
	   }
	 */
	getPaymentLimits(token, currencies) {

		const url = this.paymentLimitsUrl + "/" + currencies.inputCurrency + "/" + currencies.outputCurrency;
		const response = this.request.get(token, url);
  
		return response;
	}
}