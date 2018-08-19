const fetch = require('node-fetch')

const GetValuesOfBTC  = async () => {
    try {
        const response =  await fetch("https://www.mercadobitcoin.net/api/BTC/ticker/")
        const json = await response.json()
        return json
    } catch (error) {
        throw error
    }
}

module.exports = {GetValuesOfBTC}