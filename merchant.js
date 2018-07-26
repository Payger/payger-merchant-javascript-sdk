import Config  from './config';
import Balances from './lib/balances';
import Currencies from './lib/currencies';
import ExchangeRate from './lib/exchangerate';
import PaymentLimits from './lib/paymentlimits';
import Payments from './lib/payments';
import Transactions from './lib/transactions';
import TokenManager from './lib/tokenmanager';
import Request  from "./lib/request";

export default class Merchant {

	constructor(url, oauth2, basicAuth) {
		this.request = new Request();
		this.config = new Config(url, oauth2);
		this.tokenManager = new TokenManager(this.request, this.config, basicAuth);

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
		this.processors = {
			balances: new Balances(this.request, this.config),
			currencies: new Currencies(this.request, this.config),
			exchangeRate: new ExchangeRate(this.request, this.config),
			paymentLimits: new PaymentLimits(this.request, this.config),
			transactions: new Transactions(this.request, this.config),
			payments: new Payments(this.request, this.config)
		}
	}

	async getToken() {
		if(!this.tokenManager.isGeneratedToken()) {
			return await this.tokenManager.generateNewToken(this.config.oauth2.apiKey, this.config.oauth2.apiSecret);
		} else {
			if(this.tokenManager.checkIfTokenExpired()) {
				return await this.tokenManager.generateRefreshedToken(this.config.oauth2.apiKey, this.config.oauth2.apiSecret);
			}
		}
	}

	async call(action, data = null) {

		const currentTokenData = await this.getToken();
		const currentToken = currentTokenData.token;
		
		switch(action) {
			case this.actions.getBalances: return this.processors.balances.getBalances(currentToken);  
			case this.actions.getCurrencies: return this.processors.currencies.getCurrencies(currentToken, data);  
			case this.actions.getCurrency: return this.processors.currencies.getCurrency(currentToken, data);  
			case this.actions.getExchangeRate: return this.processors.exchangeRate.getExchangeRates(currentToken, data);  
			case this.actions.getPaymentLimits: return this.processors.paymentLimits.getPaymentLimits(currentToken, data);
			case this.actions.getTransactions: return this.processors.transactions.getTransactions(currentToken, data);
			case this.actions.getTransaction: return this.processors.transactions.getTransaction(currentToken, data);
			case this.actions.getPayments: return this.processors.payments.getPayments(currentToken, data);
			case this.actions.savePayment: return this.processors.payments.savePayment(currentToken, data);
			case this.actions.getPayment: return this.processors.payments.getPayment(currentToken, data);
			case this.actions.updatePayment: return this.processors.payments.updatePayment(currentToken, data);
			case this.actions.cancelPayment: return this.processors.payments.cancelPayment(currentToken, data);
			case this.actions.addAddress: return this.processors.payments.addAddress(currentToken, data);
		}
	}

}

