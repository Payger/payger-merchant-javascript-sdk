import  qs from "qs";

export default class Balances {

	constructor(request, config) {
		this.transactionsUrl = config.url + config.endpoints.transactions[0].url; 
		this.request = request;
	}
	getAllTransactions(token) {
		return this.request.get(token, this.transactionsUrl);
	}

	/**
	 * @param {*} paginationOptions 
	 {
		offset: integer,
		pageNumber: integer,
		pageSize: integer,
		paged: boolean,
		sorted: boolean,
		unsorted: boolean,
		upaged: boolean,
	}
	* 
	*/
	getTransactions (token, paginationOptions) {
		return this.request.get(token, this.transactionsUrl + "?" + qs.stringify(paginationOptions));
	}

	/**
	 * @param {*} id 
	 */
	getTransaction(token, id){
		return this.request.get(token, this.transactionsUrl + "/" + id);
	}

}
