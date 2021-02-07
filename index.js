import * as yahoo from 'https://deno.land/x/yahoo_stock_prices@0.0.1/yahoo-stock-prices.js'

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

const MAX_PER_HOUR = 2000;
const SECONDS_PER_HOUR = 3600;

const interval = SECONDS_PER_HOUR / (MAX_PER_HOUR / ticker.length) * 1000
setInterval(update, interval)
