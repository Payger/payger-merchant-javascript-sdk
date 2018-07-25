
/**
 * @param {paginationOptions} paginationOptions 
   {
       offset: integer,
       pageNumber: ingteger,
       pageSize: integer,
       paged: boolean,
       sorted: boolean,
       unsorted: boolean,
       upaged: boolean,
  }
 * 
 */
const getPayments = (paginationOptions) => {

}

/**
 * @param {*} payment 
 {
    "buyerEmailAddress": "jonh.doe@mail.com",
    "buyerName": "Jonh Doe",
    "callback": {
        "method": "POST",
        "params": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
        },
        "url": "http://mywebsite.com/payments/12345"
    },
    "description": "This is a description",
    "externalId": "EXT123456789",
    "inputCurrency": "BTC",
    "ipAddress": "string",
    "latitude": 0,
    "longitude": 0,
    "metadata": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
    },
    "outputAmount": 1234.5678,
    "outputCurrency": "BTS",
    "source": "string"
  }
 */
const savePayment = (payment) => {

}

/**
 * 
 * @param {integer} id 
 */
const getPayment = (id) => {

}

/**
 * 
 * @param {integer} id 
 */
const updatePayment = (id) => {

}

/**
 * 
 * @param {integer} id 
 */
const cancelPayment = (id) => {

}

/**
 * 
 * @param {integer} id 
 */
const addAddress = (id) => {

}


export default {
    getPayments,
    savePayment,
    getPayment,
    updatePayment,
    cancelPayment,
    addAddress
}