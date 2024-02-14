import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
TimeAgo.addDefaultLocale(en);

export const definePriceVector = (currentData, receivedData, tickerName) => {
  const fieldIndex = receivedData.findIndex((item) => item.ticker === tickerName);

  if (currentData[fieldIndex].price === receivedData[fieldIndex].price) {
    return 'same';
  } else if (currentData[fieldIndex].price < receivedData[fieldIndex].price) {
    return 'up';
  } else if (currentData[fieldIndex].price > receivedData[fieldIndex].price) {
    return 'down';
  }
};

export const getLastTradeTime = (tradeTime) => {
  const timeAgo = new TimeAgo('en-US');
  return timeAgo.format(new Date(tradeTime));
};
