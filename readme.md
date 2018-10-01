[![PAYGER - Merchant SDK](https://pbs.twimg.com/profile_images/955418197758496768/y12odzJe_400x400.jpg)](https://github.com/)
#  PAYGER - Merchant SDK

Welcome to our merchant sdk github tutorial.

## What is this SDK?

Javascript SDK to easily connect to Payger Merchant API.

[Here can find the API documentation.](https://developers.payger.com target="_blank") 

## Instalation

### Node.js

``` Merchant SDK ``` is available on [npm](https://www.npmjs.com/merchantsdk){:target="_blank"}. To install it try:
```
$ npm install payger-merchant-sdk
```

## Usage

Import the library in your code, and then start a new merchant to get new communication:

```js
const merchant = new Merchant(environment, oauth2, basicAuth);
```

You need to specify the environment (test or production). 


For reference here is described how to start oauth2 and basic authentication:

```js

const oauth2 = {
	apiKey: "<your_api_key>",
	apiSecret: "<your_api_secret>"
};

const basicAuth = {
	user: "<your_basic_auth_user>",
	psw: "<your_basic_auth_psw>"
};

```

### Services available

To make easier to call every actions define an object like these

```js

const actions = {
	getBalances: "GET_BALANCES", // get all balances
	getCurrencies: "GET_CURRENCIES", // get currencies (all or filtered)
	getCurrency: "GET_CURRENCY", // get a specific currency
	getExchangeRate: "GET_EXCHANGERATES", // get exchange rates ( by filters )
	getPaymentLimits: "GET_PAYMENTLIMITS", // get payment limits
	getAllTransactions: "GET_ALLTRANSACTIONS", // get transactions (all)
	getTransactions: "GET_TRANSACTIONS", // get transactions (paginated)
	getTransaction: "GET_TRANSACTION", // get a specific transaction
	getPayments: "GET_PAYMENTS", // get payments (paginated)
	savePayment: "SAVE_PAYMENTS", // create a payment
	getPayment: "GET_PAYMENT", // get a specific payment
	updatePayment: "UPDATE_PAYMENT", // update a specific payment
	cancelPayment: "CANCEL_PAYMENT", // cancel a specific payment
	addAddress: "ADD_ADDRESS", // add an address to payment
	getFees: "GET_FEES", // get Fees
};
```

Here you have all available actions. 

### How to call an action

Is really simple to call an action. Just use your ```js merchant ``` const declared before.

```js
merchant.call(actions.<whatever_action>, data);
```

Every call retrieve a promise.

### Fill speficic data parameter

Each method is prepared to receive a specific object.

Definition for every


##### Get Balances
None 

##### Get Currencies
```js
 from: String 
   - specific currency (I.E.: DASH)
   - Nullable: true
 
```

##### Get Currency
```js
 String 
    - specific currency (I.E.: DASH)
    - Nullable: false
```

##### Get Exchange Rates
```js
 productCurrency: String 
    - specific currency (I.E.: DASH)
    - Nullable: false
  amount: integer 
    - Nullable: false
  applyLimits: boolean
    - Nullable: true
  paymentCurrencies: string
    - specific currency (I.E.: DASH)
    - Nullable: true
```

##### Get Payment Limits
```js
 page: integer 
    - Nullable: false
  size: integer 
    - Nullable: false
  sort: boolean
    - Nullable: true
```

##### Get All Transactions
None

##### Get Transactions
```js
 page: integer 
    - Nullable: false
  size: integer 
    - Nullable: false
  sort: boolean
    - Nullable: true
```

##### Get Transaction
```js
 id: integer 
    - Nullable: false  
```

##### Get Payments
```js
 page: integer 
    - Nullable: false
  size: integer 
    - Nullable: false
  sort: boolean
    - Nullable: true
```


##### Save Payment
```js
    payment = {
        externalId: string,
        description: string,
        paymentCurrency: string,
        productCurrency: string,
        source: string,
        productAmount: float,
        buyerName: string,
        buyerEmailAddress : string,
        ipAddress: string,
        latitude: string,
        longitude: string,
        callback : {
            url : string,
            method : string,
            params : {
                orderID: string
            }
        },
        metadata :  {
            a : string
        }
    }
    - Nullable: false
```


##### Get Payment
```js
 id: integer 
    - Nullable: false  
```



##### Update Payment
```js
    update = {
        id: integer 
            - Nullable: false  
        values: { 
            externalId: string,
            description : string,
            metadata :  {
                "aaa" : "bbb"
            }
        }
    }
    - Nullable: false
```
##### Cancel Payment
```js
 id: integer 
    - Nullable: false  
```
##### Add address
```js
 data = {
        id: integer 
            - Nullable: false  
        address: { 
            paymentCurrency: string,
            productCurrency: string,
            productAmount: string
        }
    }
    - Nullable: false
```

##### Get Fees
```js
  feeRequest = { 
            paymentCurrency: string,
            productCurrency: string,
            productAmount: string
        }
        
    }
    - Nullable: false
```
