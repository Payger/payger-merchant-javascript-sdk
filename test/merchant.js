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
	it("Save Payment", async function() {
		const payment = {
				"externalId": "aext12342325d233323sffdsf",
				"description": "description",
				"inputCurrency": "BTC",
				"outputCurrency": "USD",
				"source": "string",
				"outputAmount": "0.003",
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
	
		await merchant.call(actions.savePayment, JSON.stringify(payment)).then(function(response) {
			console.info("Response from saving payment -----> " + response);
		});
	});

	it("Get Payment & update & cancel it", async function() {
		const payments = await merchant.call(actions.getPayments, paginationOptionsFilteredStatusPending);
		const payment = payments.content[0];
		console.info("GETTING...." + payment.id + " ---> " + payment.status + "-- external id -----> " + payment.externalId);
		await merchant.call(actions.getPayment, payment.id).then(function(response) {
			expect(response.content.id).to.be.equal(payment.id);
		});

		const update = {
			"externalId": "ext4543422id11233244232424435435",
			"description" : "desc",
			"metadata" :  {
				"aaa" : "bbb"
			}
		};
		console.info("UPDATING....");
		await merchant.call(actions.updatePayment, payment.id, update).then(function(response) {
			console.info(response);
		});
		console.info("DELETING....");
		/*await merchant.call(actions.cancelPayment, payment.id).then(function(response) {
			console.info(response);
		});*/
	});

	/*
	it("Add Address", async function() {
		await merchant.call(actions.addAddress, "transaction1").then(function(response) {
			console.info(response);
		});
	});*/
});