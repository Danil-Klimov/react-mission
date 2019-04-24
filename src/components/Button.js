import React from 'react';

export default function(props) {
    return (
      <button className={`table__button ${props.className}`}
        style={props.style}>
        {props.text}
      </button>
    );
};