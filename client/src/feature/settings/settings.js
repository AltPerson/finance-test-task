import React from 'react';
import './settings.css';
import IntervalRange from './components/interval-range/interval-range';
import { useSettingsHelper } from './hook/use-settings-helper.hook';
import { ReactComponent as SettingsIcon } from 'assets/icons/settings.svg';
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { ReactComponent as AcceptIcon } from 'assets/icons/accept.svg';
import TickersPicker from './components/tickers-picker/tickers-picker';
import TrackSwitcher from './components/track-switcher/track-switcher';
import Button from 'components/button/button';

const Settings = () => {
  const {
    updateDelay,
    handleUpdateDelay,
    handleSetOpenModal,
    openModal,
    isEdited,
    tickers,
    handleAcceptChanges,
    handleSetPickers,
    handleSetIsTracking,
    isTracking,
  } = useSettingsHelper();
  return (
    <div className="settings">
      <div className={`settings-modal ${openModal && 'open'}`}>
        <IntervalRange updateDelay={updateDelay} handleUpdateDelay={handleUpdateDelay} />
        <TickersPicker tickers={tickers} handleSetPickers={handleSetPickers} />
        <TrackSwitcher isTracking={isTracking} handleSetIsTracking={handleSetIsTracking} />
        <div className="settings-modal__buttons">
          <Button img={<AcceptIcon />} disabled={!isEdited.isEdit} fn={handleAcceptChanges} />
          <Button img={<CrossIcon />} fn={handleSetOpenModal} />
        </div>
      </div>
      <Button img={<SettingsIcon />} fn={handleSetOpenModal} />
    </div>
  );
};

export default Settings;
