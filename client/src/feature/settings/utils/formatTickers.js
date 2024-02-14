export const formatTickersArray = (tickers) => {
  return tickers.map((item) => ({
    label: item,
    isPicked: true,
  }));
};
