import { config } from "../config";
import { request } from "./request";

export default class PaymentLimits {

	constructor() {
		this.paymentLimits = config.endpoints.paymentLimits[0];
		this.paymentLimitsUrl = config.url + this.paymentLimits.uri; 
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
		const response = request.get(token, url);
  
		return response;
	}
}