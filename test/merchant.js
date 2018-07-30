import Merchant from "../merchant";
import { expect } from "chai";

const url = "http://merchant-api-test.payger.com/api/v1";

const oauth2 = {
	apiKey: "2e5f36c374367fb1b28ba2d884e087d7fb5a6abf21e65a7d370b407b309514fd",
	apiSecret: "VgPMwTAeycSeWTdxvmWKBdzSInqnnEDN"
};

const basicAuth = {
	user: "payger",
	psw: ""
};

const actions = {
	getBalances: "GET_BALANCES",
	getCurrencies: "GET_CURRENCIES",
	getCurrency: "GET_CURRENCY",
	getExchangeRate: "GET_EXCHANGERATES", 
	getPaymentLimits: "GET_PAYMENTLIMITS",
	getAllTransactions: "GET_ALLTRANSACTIONS",
	getTransactions: "GET_TRANSACTIONS",
	getTransaction: "GET_TRANSACTION",
	getPayments: "GET_PAYMENTS",
	savePayment: "SAVE_PAYMENTS",
	getPayment: "GET_PAYMENT",
	updatePayment: "UPDATE_PAYMENT",
	cancelPayment: "CANCEL_PAYMENT",
	addAddress: "ADD_ADDRESS"
};

const merchant = new Merchant(url, oauth2, basicAuth);

const paginationOptions = {
	page: 0,
	size: 10
};

const paginationOptionsFilteredStatusPending = {
	status: "PENDING",
	page: 0,
	size: 10
};


const paginationOptionsPayments = {
	page: 1,
	size: 10,
	sort: "created,desc"
};

function guid() {
	function s4() {
	  return Math.floor((1 + Math.random()) * 0x10000)
		.toString(16)
		.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4();
}

const externalId = guid();

const payment = {
	"externalId": externalId,
	"description": "description",
	"inputCurrency": "BTC",
	"outputCurrency": "USD",
	"source": "string",
	"outputAmount": "3",
	"buyerName": "buyer",
	"buyerEmailAddress" : "test@test.com",
	"ipAddress": "10.10.10.1",
	"latitude": "",
	"longitude": "-11.585274",
	"callback" : {
		"url" : "http://demo.com",
		"method" : "POST",
		"params" : {
			"orderID": "57B25E6B-A877-4102-ADC5-473A9E701ED5"
		}
	},
	"metadata" :  {
		"a" : "b"
	}
};

const update = {
	"externalId": externalId,
	"description" : "desc",
	"metadata" :  {
		"aaa" : "bbb"
	}
};

const address = {
    "inputCurrency": "BTC",
	"outputCurrency": "USD",
	"outputAmount": "0.000024"
};


describe("merchant", function() {
	it("Get balances", async function() {
		await merchant.call(actions.getBalances).then(function(response) {
			expect(response.content).to.be.an("array");
			expect(response.content).to.be.not.equal(0);
		});
	});

	it("Get currencies", async function() {
		await merchant.call(actions.getCurrencies).then(function(response) {
			expect(response.content.currencies).to.be.an("array");
			expect(response.content.currencies).to.be.not.equal(0);
		});
	});

	it("Get currencies with parameter", async function() {
		await merchant.call(actions.getCurrencies, "DASH").then(function(response) {
			expect(response.content.currencies).to.be.an("array");
			expect(response.content.currencies).to.be.not.equal(0);
		});
	});

	it("Get currency", async function() {
		await merchant.call(actions.getCurrency, "BTS").then(function(response) {
			expect(response.content.longName).to.be.equal("Bitshares");
		});
	});

	
	it("Get exchange rates with parameter without filter", async function() {
		await merchant.call(actions.getExchangeRate, { from: "USD", amount: 10 }).then(function(response) {
			expect(response.content.rates).to.be.an("array");
			expect(response.content.rates).to.be.not.equal(0);
		});
	});
	
	it("Get exchange rates with filter", async function() {
		await merchant.call(actions.getExchangeRate, { from: "USD", amount: 10, applyLimits: true, to: null}).then(function(response) {
			expect(response.content.rates).to.be.an("array");
			expect(response.content.rates).to.be.not.equal(0);
		});
	});

	it("Get payment limits", async function() {
		await merchant.call(actions.getPaymentLimits, { inputCurrency: "BTC", outputCurrency: "BTS" }).then(function(response) {
			expect(response.content.currency).to.be.equal("BTS");
		});
	});
	it("Get all transactions", async function() {
		await merchant.call(actions.getAllTransactions, paginationOptions).then(function(response) {
			expect(response.content.transactions).to.be.an("array");
			expect(response.content.transactions).to.be.not.equal(0);
		});
	});
	
	it("Get transactions paginated", async function() {
		await merchant.call(actions.getTransactions, paginationOptions).then(function(response) {
			expect(response).to.be.not.equal(null);
			expect(response).to.be.not.equal(undefined);
			expect(response.content.transactions).to.be.an("array");
			expect(response.content.transactions).to.be.not.equal(0);
		});
	});

	it("Get transaction", async function() {
		await merchant.call(actions.getTransaction, "transaction1").then(function(response) {
			expect(response).to.be.not.equal(null);
			expect(response).to.be.not.equal(undefined);
			expect(response.content.transactions).to.be.an("array");
			expect(response.content.transactions).to.be.not.equal(0);
		});
	});

	it("Get payments paginated", async function() {
		await merchant.call(actions.getPayments, paginationOptionsPayments).then(function(response) {
			expect(response).to.be.not.equal(null);
			expect(response).to.be.not.equal(undefined);
			expect(response.content).to.be.an("array");
			expect(response.content).to.be.not.equal(0);
		});
	});
	it("Save Payment & Get & add address & update & cancel it", async function() {
		
		const contentCreated = await merchant.call(actions.savePayment, JSON.stringify(payment)).then(function(response) {
			expect(response.content.externalId).to.be.equal(externalId);
			return response.content;
		});

		await merchant.call(actions.getPayment, contentCreated.id).then(function(response) {
			expect(response.content.id).to.be.equal(contentCreated.id);
		});

		await merchant.call(actions.addAddress, { id: contentCreated.id, address: JSON.stringify(address) }).then(function(response) {
			expect(response.content.id).to.be.equal(contentCreated.id);
		});

		await merchant.call(actions.updatePayment, { id: contentCreated.id, values: JSON.stringify(update) }).then(function(response) {
			expect(response.content.id).to.be.equal(contentCreated.id);
		});

		await merchant.call(actions.cancelPayment, contentCreated.id).then(function(response) {
			expect(response.content.id).to.be.equal(contentCreated.id);
		});

	});
	
});