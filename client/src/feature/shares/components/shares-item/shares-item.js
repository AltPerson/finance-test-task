import React from 'react';
import { operationsIcon, priceSymbol, priceVectorIcons, sharesNames } from 'constants';
import './shares-item.css';
import Button from 'components/button/button';
import { ReactComponent as TickIcon } from 'assets/icons/tick.svg';
import Label from 'components/label/label';
import { getLastTradeTime } from 'feature/shares/utils';

const SharesItem = ({ item, priceVector, handleSetFavorites, operation, favorites }) => {
  const tickerPriceVector = priceVector[item.ticker];
  const priceVectorSymbol = priceSymbol[tickerPriceVector];
  const priceVectorIcon = priceVectorIcons[tickerPriceVector];
  const itemExistInFavorites = favorites.some((favItem) => favItem.ticker === item.ticker);
  const operationIcon = operationsIcon[operation];

  return (
    <div className="item-container">
      <div className="item-container__name">
        <Label className={item.ticker.toLowerCase()} text={item.ticker} />
        {sharesNames[item.ticker]}
      </div>
      <div className="item-container__numbers numbers">
        <div className="numbers-price">
          <span>{item.price} $</span>
          <span className={`change-${tickerPriceVector}`}>
            {priceVectorSymbol}
            {item.change} $
          </span>
          <div className={tickerPriceVector}>
            {priceVectorIcon}
            {item.change_percent}%
          </div>
        </div>
        <div className="numbers-dividend">
          <span>{item.dividend}$</span>
          <div className={tickerPriceVector}>
            {priceVectorIcon}
            {item.yield}%
          </div>
          <span>{getLastTradeTime(item.last_trade_time)}</span>
        </div>
        <div>
          {itemExistInFavorites && operation === 'add' ? (
            <Button img={<TickIcon />} disabled={true} />
          ) : (
            <Button fn={() => handleSetFavorites(item)} img={operationIcon} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SharesItem;
