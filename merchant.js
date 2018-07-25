import { Config } from 'config';
import { Balances } from 'lib/balances';
import { Currencies } from 'lib/currencies';
import { ExchangeRate } from 'lib/exchangeRate';
import { PaymentLimits } from 'lib/paymentLimits';
import { Payments } from 'lib/payments';
import { Transactions } from 'lib/transactions';
import { TokenManager } from 'lib/tokenmanager';

export default class Merchant {

    constructor() {
        this.tokenmanager = new TokenManager();

        this.actions = {
            getBalances: "GET_BALANCES",
            getCurrencies: "GET_CURRENCIES",
            getCurrency: "GET_CURRENCY",
            getExchangeRate: "GET_EXCHANGERATES", 
            getPaymentLimits: "GET_PAYMENTLIMITS",
            getTransactions: "GET_TRANSACTIONS",
            getTransaction: "GET_TRANSACTION",
            getPayments: "GET_PAYMENTS",
            savePayment: "SAVE_PAYMENTS",
            getPayment: "GET_PAYMENT",
            updatePayment: "UPDATE_PAYMENT",
            cancelPayment: "CANCEL_PAYMENT",
            addAddress: "ADD_ADDRESS"
        }
    }

    setConfig(url, oauth2) {
        Config.setConfig(url, oauth2);
    }

    validateToken(tokenManager) {
        if(!tokenManager.isGeneratedToken()) {
            tokenmanager.generateNewToken(Config.oauth2.apiKey, tokenmanager.oauth2.apiSecret);
        } else {
            if(tokenmanager.checkIfTokenExpired()) {
                tokenmanager.generateRefreshedToken(Config.oauth2.apiKey, tokenmanager.oauth2.apiSecret);
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
            case this.actions.getTransactions: return Transactions.getTransactions(currentToken, data);
            case this.actions.getTransaction: return Transactions.getTransaction(currentToken, data);
            case this.actions.getPayments: return Payments.getPayments(currentToken, data);
            case this.actions.savePayment: return Payments.savePayment(currentToken, data);
            case this.actions.getPayment: return Payments.getPayment(currentToken, data);
            case this.actions.updatePayment: return Payments.updatePayment(currentToken, data);
            case this.actions.cancelPayment: return Payments.cancelPayment(currentToken, data);
            case this.actions.addAddress: return Payments.addAddress(currentToken, data);
        }
    }

}

