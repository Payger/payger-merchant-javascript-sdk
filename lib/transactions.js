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
		const parameters = "?offset=" + paginationOptions.offset + "&pageNumber=" + paginationOptions.pageNumber 
			+ "&pageSize=" + paginationOptions.pageSize + "&paged=" + paginationOptions.paged 
			+ "&sort.sorted=" + paginationOptions.sorted + "&sort.unsorted=" + paginationOptions.unsorted + "&unpaged=" + paginationOptions.unpaged;

		return this.request.get(token, this.transactionsUrl + parameters);
	}

	/**
	 * @param {*} id 
	 */
	getTransaction(token, id){
		return this.request.get(token, this.transactionsUrl + "/" + id);
	}

}
