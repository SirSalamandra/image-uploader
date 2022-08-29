import React from "react";
import './Card.css';

const Card: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <div id='card'>
      {props.children}
    </div>
  );
}

export default Card;