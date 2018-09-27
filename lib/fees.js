export default class Fees {

	constructor(request, config) {
		this.feesUrl = config.url + config.endpoints.fees[0].url;
		this.request = request;
	}

	/**
    *
    * @param {integer} id
    * @param {address} feeRequest
    {
     paymentCurrency*: string,
     productAmount*	number,
     productCurrency*	string
    }
    */
	getFees(token, feeRequest){
		const url = this.feesUrl;
		return this.request.post(token, url, null, feeRequest);
	}
}