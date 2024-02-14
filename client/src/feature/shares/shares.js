import React from 'react';
import { useSharesHelper } from './hooks/use-shares-helper.hook';
import './shares.css';
import SharesItem from './components/shares-item/shares-item';

const Shares = () => {
  const { priceVector, queryData, handleSetFavorites, favorites, operation } = useSharesHelper();

  return (
    <div className="shares">
      <ul className="shares__list list">
        {queryData.length !== 0 ? (
          queryData.map((item) => (
            <li className="list__item item" key={item.ticker}>
              <SharesItem item={item} priceVector={priceVector} operation={operation} favorites={favorites} handleSetFavorites={handleSetFavorites} />
            </li>
          ))
        ) : (
          <li className="item_empty">Список порожній</li>
        )}
      </ul>
    </div>
  );
};

export default Shares;
