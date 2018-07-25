
import { config } from "../config";
import { request } from "./request";

export default class Payments {


	constructor() {
		this.payments = config.endpoints.payments[0];
		this.paymentsUrl = config.url + this.payments.uri; 
	
		this.paymentsAddress = config.endpoints.payments[1];
		this.paymentsAddressUrl = config.url + this.payments.uri; 
	}
	
	/**
	 * @param {string} token 
	 * @param {paginationOptions} paginationOptions 
		{
			offset: integer,
			pageNumber: ingteger,
			pageSize: integer,
			paged: boolean,
			sorted: boolean,
			unsorted: boolean,
			upaged: boolean,
		}
	 */
	getPayments(token, paginationOptions) {
		const parameters = "?offset=" + paginationOptions.offset + "&pageNumber=" + paginationOptions.pageNumber 
			+ "&pageSize=" + paginationOptions.pageSize + "&paged=" + paginationOptions.paged 
			+ "&sort.sorted=" + paginationOptions.sorted + "&sort.unsorted=" + paginationOptions.unsorted + "&unpaged=" + paginationOptions.unpaged;
			
		return request.get(token, this.paymentsUrl + parameters);
	}


	
	/**
	 * @param {*} payment 
	 {
		"buyerEmailAddress": "jonh.doe@mail.com",
		"buyerName": "Jonh Doe",
		"callback": {
			"method": "POST",
			"params": {
			"additionalProp1": "string",
			"additionalProp2": "string",
			"additionalProp3": "string"
			},
			"url": "http://mywebsite.com/payments/12345"
		},
		"description": "This is a description",
		"externalId": "EXT123456789",
		"inputCurrency": "BTC",
		"ipAddress": "string",
		"latitude": 0,
		"longitude": 0,
		"metadata": {
			"additionalProp1": "string",
			"additionalProp2": "string",
			"additionalProp3": "string"
		},
		"outputAmount": 1234.5678,
		"outputCurrency": "BTS",
		"source": "string"
	}
	*/
	savePayment(token, payment){
		return request.post(token, this.paymentsUrl, payment);
	}

	/**
	 * 
	 * @param {integer} id 
	 */
	getPayment(token, id){
		return request.get(token, this.paymentsUrl + "/" + id);
	}

	/**
	 * 
	 * @param {integer} id 
	 */
	updatePayment(token, id, data){
		return request.put(token, this.paymentsUrl + "/" + id, data);
	}

	/**
	 * 
	 * @param {integer} id 
	 */
	cancelPayment(token, id){
		return request.delete(token, this.paymentsUrl + "/" + id);
	}

	/**
	 * 
	 * @param {integer} id 
	 */
	addAddress(token, id, address){
		const url = this.paymentsAddressUrl.replace("{id}", id);
		return request.post(token, url, address);
	}

}