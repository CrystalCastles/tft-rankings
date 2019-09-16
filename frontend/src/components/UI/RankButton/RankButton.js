import React from 'react';

import './RankButton.scss';

const rankButton = (props) => {
  return (
    <button className="RankButton" style={props.style} onClick={props.click} value={props.value}>{props.name}</button>
  )
}

export default rankButton;