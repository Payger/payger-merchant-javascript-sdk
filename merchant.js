import { config } from './config';
import { Balances } from 'lib/balances';
import { Currencies } from 'lib/currencies';
import { ExchangeRate } from 'lib/exchangeRate';
import { PaymentLimits } from 'lib/paymentLimits';
import { Payments } from 'lib/payments';
import { Transactions } from 'lib/transactions';
import { TokenManager } from 'lib/tokenmanager';

export default class Merchant {

    tokenmanager = new TokenManager();

    actions = {
        getBalances: "GET_BALANCES",
        getCurrencies: "GET_CURRENCIES",
        getCurrency: "GET_CURRENCY",
        getExchangeRate: "GET_EXCHANGERATES", 
        getPaymentLimits: "GET_PAYMENTLIMITS",
    }

    validateToken(tokenManager) {
        if(!tokenManager.isGeneratedToken()) {
            tokenmanager.generateNewToken(config.oauth2.apiKey, tokenmanager.oauth2.apiSecret);
        } else {
            if(tokenmanager.checkIfTokenExpired()) {
                tokenmanager.generateRefreshedToken(config.oauth2.apiKey, tokenmanager.oauth2.apiSecret);
            }
        }
    }

    call(action, data = null) {

        this.validateToken(this.tokenmanager)
        const currentToken = tokenManager.getCurrentToken();

        switch(action) {
            case this.actions.getBalances: return Balances.getBalances(currentToken);  
            case this.actions.getCurrencies: return Currencies.getCurrencies(currentToken, data);  
            case this.actions.getCurrency: return Currencies.getCurrency(currentToken, data);  
            case this.actions.getExchangeRate: return ExchangeRate.getExchangeRates(currentToken, data);  
            case this.actions.getPaymentLimits: return PaymentLimits.getPaymentLimits(currentToken, data);
        }
    }

}

