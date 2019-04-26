import React from 'react';

const Button = (props) => {
    return (
      <button className={`table__button ${props.className}`}
        style={props.style}
        onClick={props.onClick}>
        {props.text}
      </button>
    );
};
export default Button;