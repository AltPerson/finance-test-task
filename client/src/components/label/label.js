import React from 'react';
import './label.css';

const Label = ({ text, className }) => {
  return <span className={`label ${className}`}>{text}</span>;
};

export default Label;
