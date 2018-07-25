import { config } from '../config';
import { request } from './request';

export default class Balances {

    exchangeRates = config.endpoints.exchangeRates[0];
    exchangeRatesUrl = config.url + this.exchangeRates.uri; 
    exchangeRatesMethod = this.exchangeRates.method;
  
    /**
     * 
     * @param {criteria} criteria 
      criteria {
        amount*: string  
        applyLimits: string (Default value: false)
        from*: string
        to: string
      }
      * mandatory
    */
    getExchangeRates = (token, criteria) => {
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
}
