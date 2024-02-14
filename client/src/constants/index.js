import { ReactComponent as DownArrow } from 'assets/icons/down.svg';
import { ReactComponent as UpArrow } from 'assets/icons/up.svg';
import { ReactComponent as AddIcon } from 'assets/icons/add.svg';
import { ReactComponent as RemoveIcon } from 'assets/icons/remove.svg';

export const sharesNames = {
  AAPL: 'Apple',
  GOOGL: 'Google',
  MSFT: 'Microsoft',
  AMZN: 'Amazon',
  FB: 'Facebook',
  TSLA: 'Tesla Motors',
};

export const sharesColors = {
  AAPL: '#666666',
  GOOGL: '#4285f4',
  MSFT: '#737373',
  AMZN: '#c26c03',
  FB: '#d55e00',
  TSLA: '#e31937',
};

export const priceVectorIcons = {
  up: <UpArrow />,
  down: <DownArrow />,
  same: '',
};

export const priceSymbol = {
  up: '+',
  down: '-',
  same: '',
};

export const operationsIcon = {
  add: <AddIcon />,
  remove: <RemoveIcon />,
};
