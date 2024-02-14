import React from 'react';
import './button.css';

const Button = ({ img, fn, disabled }) => {
  return (
    <button className="button-container" onClick={fn} disabled={disabled}>
      {img}
    </button>
  );
};

export default Button;
