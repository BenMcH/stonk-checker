import * as yahoo from 'https://deno.land/x/yahoo_stock_prices@0.0.1/yahoo-stock-prices.js'

const REFRESH_TIME_IN_SECONDS = 5;

const ticker = [
  'GME',
  'AMC'
]

const log = (message, ...data) => console.log(`[${new Date().toISOString()}]: ${message}`, ...data)

const update = async () => {
  for(let symbol of ticker) {
    await yahoo.getCurrentPrice(symbol).then((price) => log(`${symbol}: ${price}`)).catch((err) => log(`Error fetching: ${symbol}`, err))
  }
}

update();
setInterval(update, REFRESH_TIME_IN_SECONDS * 1000)
