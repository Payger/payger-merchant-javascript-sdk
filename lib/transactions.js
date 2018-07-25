
import { config } from "../config";
import { request } from "./request";

export default class Balances {

	constructor() {
		this.transactions = config.endpoints.transactions[0];
		this.transactionsUrl = config.url + this.transactions.uri; 
	}

	getAllTransactions(token) {
		return request.get(token, this.transactionsUrl);
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

		return request.get(token, this.transactionsUrl + parameters);
	}

	/**
	 * @param {*} id 
	 */
	getTransaction(token, id){
		return request.get(token, this.transactionsUrl + "/" + id);
	}

}
