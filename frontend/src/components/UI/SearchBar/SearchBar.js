import React from 'react';

import './SearchBar.scss';

const searchBar = (props) => {
  return (
    <input id="SearchBar" type='text' placeholder='e.g. dogdogdog' name='summonerName' value={props.text} onChange={props.handleChange}/>
  )
}

export default searchBar;