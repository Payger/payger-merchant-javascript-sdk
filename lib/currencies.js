import { config } from '../config';
import { request } from './request';

export default class Balances {

    currencies = config.endpoints.currencies;
    currenciesUrl = config.url + this.currencies[0].uri; 
    currenciesMethod = this.currencies[0].method;

    /**
     * @param {string} from 
     */
    getCurrencies = (token, from = null) => {
        const url = from != null ? this.currenciesUrl + '?from=' + from : this.currenciesUrl; 

        return request.get(token, this.balancesUrl);
    }

    /**
     * @param {string} currency 
     */
    getCurrency = (token, currency) => {
        return request.get(token, this.currenciesUrl + "/" + currency);;
    }
}