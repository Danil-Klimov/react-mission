import React from 'react';

const Button = (props) => {
  const className = `table__button ${props.className}`;
  const size = {width: props.size, height: props.size};
  if(props.children === '+') {
    return (
      <button className={`${className} table__button_add`}
              style={size}
              onClick={props.onClick}>
        {props.children}
      </button>
    );
  } else {
    return (
      <button className={`${className} table__button_del ${props.show ? "show" : ""}`}
              style={{...props.position, ...size}}
              onClick={props.onClick}>
        {props.children}
      </button>
    );
  }
};
export default Button;