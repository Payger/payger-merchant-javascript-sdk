
import { config } from '../config';
import { request } from './request';

export default class Balances {

    transactions = config.endpoints.transactions[0];
    transactionsUrl = config.url + this.transactions.uri; 

    getAllTransactions(token) {
        return await request.get(token, this.transactionsUrl);
    }

    getTransaction(token, transactionId) {
        return await request.get(token, this.transactionsUrl + '/' + transactionId);
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
    getTransactions = (token, criteria) => {
        const url = this.exchangeRatesUrl + '?amount=' + criteria.amount;

        if(criteria.applyLimits && criteria.applyLimits != null && criteria.applyLimits != '') {
            url += '&applyLimits=' + criteria.applyLimits;
        }

        url += '&from=' + criteria.from;

        if(criteria.to && criteria.to != null && criteria.to != '') {
            url += '&to=' + criteria.to;
        }
        
        const response = request.get(token, url);

        return response;
    }

    /**
     * @param {*} id 
     */
    getTransaction = (token, id) => {
        return request.get(token, this.transactionsUrl + '/' + id);
    }

}
