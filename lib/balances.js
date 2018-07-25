import { config } from '../config';
import { request } from './request';

export default class Balances {

    balances = config.endpoints.balances[0];
    balancesUrl = config.url + this.balances.uri; 
    
     /**
     * @param {string} token 
     */
    getBalances = (token) => {
        return request.get(token, this.balancesUrl);
    }
}