export default {
    token: [
        {
            url: "/oauth/token",
            description: "Generate new token"
        }
    ], balances: [
        {
            url: "/api/v1/api/v1/merchants/balances",
            description: "Get merchant's balance"
        }
    ], currencies: [
        {
            url: "/api/v1/api/v1/merchants/currencies",
            description: "Get currencies"
        }
    ], exchangeRates: [
        {
            url: "/api/v1/merchants/exchange-rates",
            description: "Get exchange rates"
        }

    ], paymentLimits: [
        {
            url: "/api/v21/merchants/payment-limits/{inputCurrency}/{outputCurrency}",
            description: "Get payment limit for a specified currency"
        }

    ], payments: [
        {
            url: "/api/v1/merchants/payments",
            description: "Gets all payment requests for a merchant"
        }, {
            url: "/api/v1/merchants/payments/{id}/address",
            description: "Adds a new address to an existing payment"
        }  
    ], transactions: [
        {
            url: "/api/v1/merchants/transactions",
            description: "Gets all transactions for a merchant"
        }
    ]
}