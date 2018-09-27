import Merchant from "../merchant";
import { expect } from "chai";

const environment = "test";

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
	addAddress: "ADD_ADDRESS",
	getFees: "GET_FEES",
};

const merchant = new Merchant(environment, oauth2, basicAuth);

const paginationOptions = {
	page: 1,
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
	return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4();
}

const externalId = guid();

const payment = {
	"externalId": externalId,
	"description": "description",
	"paymentCurrency": "BTC",
	"productCurrency": "USD",
	"source": "string",
	"productAmount": "3",
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
	"paymentCurrency":"BTC",
	"productCurrency":"USD",
	"productAmount":"0.00001"
};

const feeRequest = {
	"paymentCurrency":"BTC",
	"productCurrency":"USD",
	"productAmount":"0.15"
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
		await merchant.call(actions.getExchangeRate, { productCurrency: "USD", amount: 10, applyLimits: false }).then(function(response) {
			expect(response.content.rates).to.be.an("array");
			expect(response.content.rates).to.be.not.equal(0);
		});
	});
	
	it("Get exchange rates with filter", async function() {
		await merchant.call(actions.getExchangeRate, { productCurrency: "USD", amount: 10, applyLimits: true, paymentCurrencies: null}).then(function(response) {
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
			expect(response.content).to.be.an("array");
			expect(response.content).to.be.not.equal(0);
		});
	});
	
	it("Get transactions paginated", async function() {
		await merchant.call(actions.getTransactions, paginationOptions).then(function(response) {
			expect(response).to.be.not.equal(null);
			expect(response).to.be.not.equal(undefined);
			expect(response.content).to.be.an("array");
			expect(response.content).to.be.not.equal(0);
		});
	});

	it("Get transaction", async function() {
		await merchant.call(actions.getTransaction, "67d21720-9190-11e8-bc37-f9d156af0449").then(function(response) {
			expect(response).to.be.not.equal(null);
			expect(response).to.be.not.equal(undefined);
			expect(response.content).to.be.an("object");
			expect(response.content.id).to.be.equal("67d21720-9190-11e8-bc37-f9d156af0449");
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

		await merchant.call(actions.getPayment, contentCreated.id).then(function(response) {
			expect(response.content.id).to.be.equal(contentCreated.id);
		});

		await merchant.call(actions.updatePayment, { id: contentCreated.id, values: JSON.stringify(update) }).then(function(response) {
			expect(response.content.id).to.be.equal(contentCreated.id);
		});

		await merchant.call(actions.cancelPayment, contentCreated.id).then(function(response) {
			expect(response.content.id).to.be.equal(contentCreated.id);
		});

	});

	it("Get Fees", async function() {
		await merchant.call(actions.getFees, JSON.stringify(feeRequest)).then(function(response) {
			expect(response).to.be.not.equal(null);
			expect(response.feeInPaymentCurrency).to.be.not.equal(null);
			expect(response.feeInProductCurrency).to.be.not.equal(null);
		});
	});
	
});