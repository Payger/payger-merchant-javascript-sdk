import Merchant from "../merchant";
import { expect } from 'chai';

var url = "http://merchant-api-test.payger.com/api/v1";

var oauth2 = {
	apiKey: "2e5f36c374367fb1b28ba2d884e087d7fb5a6abf21e65a7d370b407b309514fd",
	apiSecret: "VgPMwTAeycSeWTdxvmWKBdzSInqnnEDN"
};

var basicAuth = {
	user: "payger",
	psw: ""
};

describe("balances", function() {
	it("Get balances", function() {
		const merchant = new Merchant(url, oauth2, basicAuth);
		merchant.call("GET_BALANCES").then(function(response) {
			expect(response.content).to.be.an('array');
			expect(response.content).to.be.not.equal(0);
		});
		
	});
});