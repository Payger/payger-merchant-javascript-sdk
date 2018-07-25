import { config } from '../config';
import { request } from './request';

export default class PaymentLimits {

    paymentLimits = config.endpoints.paymentLimits[0];
    paymentLimitsUrl = config.url + this.paymentLimits.uri; 
    
    /**
     * @param {string} token 
     * @param {object} currencies
       {
           inputCurrency: {string}
           outputCurrency: {string}
       }
     */
    getPaymentLimits = (token, currencies) => {

        const url = this.paymentLimitsUrl + '/' + currencies.inputCurrency + '/' + currencies.outputCurrency;
        const response = await request.get(token, url);
  
        return response;
    }
}