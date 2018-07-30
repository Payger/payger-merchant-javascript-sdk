import  qs from "qs";

export default class Payments {


	constructor(request, config) {
		this.paymentsUrl = config.url + config.endpoints.payments[0].url; 
		this.paymentsAddressUrl = config.url + config.endpoints.payments[1].url; 
		this.request = request;
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
		return this.request.get(token, this.paymentsUrl + "?" + qs.stringify(paginationOptions));
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
		return this.request.post(token, this.paymentsUrl, null, payment);
	}

	/**
	 * 
	 * @param {integer} id 
	 */
	getPayment(token, id){
		return this.request.get(token, this.paymentsUrl + "/" + id);
	}

	/**
	 * 
	 * @param {integer} id 
	 */
	updatePayment(token, data){
		return this.request.put(token, this.paymentsUrl + "/" + data.id, data.values);
	}

	/**
	 * 
	 * @param {integer} id 
	 */
	cancelPayment(token, id){
		return this.request.delete(token, this.paymentsUrl + "/" + id);
	}

	/**
	 * 
	 * @param {integer} id 
	 */
	addAddress(token, data){
		const url = this.paymentsAddressUrl.replace("{id}", data.id);
		return this.request.post(token, url, null, data.address);
	}

}