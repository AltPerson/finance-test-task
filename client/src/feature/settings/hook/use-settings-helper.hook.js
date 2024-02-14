import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectSocket } from 'store/reducers/socket/socket-slice';
import { formatTickersArray } from '../utils/formatTickers';

export const useSettingsHelper = () => {
  const socket = useSelector(selectSocket);
  const [updateDelay, setUpdateDelay] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [isTracking, setIsTracking] = useState(true);
  const [tickers, setTickers] = useState([]);
  const [isEdited, setIsEdited] = useState({
    isEdit: false,
    updateDelay,
    tickers,
    isTracking,
  });

  const handleUpdateDelay = (e) => {
    setUpdateDelay(e.target.value);
    setIsEdited((prev) => ({
      ...prev,
      isEdit: true,
    }));
  };

  const handleSetPickers = (e) => {
    setTickers((prev) =>
      prev.map((ticker) =>
        ticker.label === e.target.id
          ? {
              ...ticker,
              isPicked: !ticker.isPicked,
            }
          : ticker,
      ),
    );
    setIsEdited((prev) => ({
      ...prev,
      isEdit: true,
    }));
  };

  const handleSetIsTracking = () => {
    setIsTracking((prev) => !prev);
    setIsEdited((prev) => ({
      ...prev,
      isEdit: true,
    }));
  };

  const handleSetOpenModal = () => {
    if (openModal) {
      setTickers(isEdited.tickers);
      setUpdateDelay(isEdited.updateDelay);
      setIsTracking(isEdited.isTracking);
      setOpenModal(false);
    } else {
      setIsEdited((prev) => ({
        ...prev,
        isEdit: false,
      }));
      setOpenModal((prev) => !prev);
    }
  };

  const handleAcceptChanges = () => {
    const params = {
      interval: updateDelay * 1000,
      tickersArray: tickers.map((ticker) => (!ticker.isPicked ? ticker.label : ''), isTracking),
      isTracking,
    };
    socket.emit('setSettings', params);
    setIsEdited({
      isEdit: false,
      updateDelay,
      tickers,
      isTracking,
    });
    setOpenModal((prev) => !prev);
  };

  useEffect(() => {
    if (socket) {
      socket.emit('getSettings');
      socket.on('getSettings', (response) => {
        setUpdateDelay(response.interval / 1000);
        setTickers(formatTickersArray(response.tickersArray));
        setIsTracking(response.isTracking);
        setIsEdited((prev) => ({
          ...prev,
          updateDelay: response.interval / 1000,
          tickers: formatTickersArray(response.tickersArray),
          isTracking: response.isTracking,
        }));
      });
    }
  }, [socket]);

  return {
    updateDelay,
    openModal,
    isEdited,
    tickers,
    isTracking,
    handleSetPickers,
    handleSetOpenModal,
    handleUpdateDelay,
    handleSetIsTracking,
    handleAcceptChanges,
  };
};
