export default {
    token: [
        {
            url: "/oauth/token",
            description: "Generate new token"
        }
    ], balances: [
        {
            url: "/merchants/balances",
            description: "Get merchant's balance"
        }
    ], currencies: [
        {
            url: "/merchants/currencies",
            description: "Get currencies"
        }
    ], exchangeRates: [
        {
            url: "/merchants/exchange-rates",
            description: "Get exchange rates"
        }

    ], paymentLimits: [
        {
            url: "/api/v21/merchants/payment-limits/{inputCurrency}/{outputCurrency}",
            description: "Get payment limit for a specified currency"
        }

    ], payments: [
        {
            url: "/merchants/payments",
            description: "Gets all payment requests for a merchant"
        }, {
            url: "/merchants/payments/{id}/address",
            description: "Adds a new address to an existing payment"
        }  
    ], transactions: [
        {
            url: "/merchants/transactions",
            description: "Gets all transactions for a merchant"
        }
    ]
}