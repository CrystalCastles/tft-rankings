import React from 'react';

import "./RegionSelector.scss";

const regionSelector = (props) => {
  return (
    <select id="RegionSelect" value={props.value} onChange={props.handleChange}>
      <option value="na1">NA</option>
      <option value="euw1">EUW</option>
      <option value="kr">KR</option>
      <option value="eun1">EUNE</option>
      <option value="jp1">JP</option>
      <option value="la1">LAN</option>
      <option value="la2">LAS</option>
      <option value="oc1">OCE</option>
      <option value="tr1">TR</option>
      <option value="ru">RU</option>
      <option value="pbe1">PBE</option>
    </select>
  )
}

export default regionSelector;