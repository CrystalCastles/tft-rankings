import React from 'react';
import { MDBDataTable } from 'mdbreact';

import './RankTable.scss';

const rankTable = (props) => {
  const data = props.data;

  const compare = (a, b) => {
    const lpA = a.leaguePoints;
    const lpB = b.leaguePoints;

    let comparison = 0;
    if(lpA > lpB) {
      comparison = -1;
    } else if(lpA < lpB) {
      comparison = 1;
    }
    return comparison;
  }

  data.sort(compare);
  let id = 1;

  const precise = x => Number.parseFloat(x * 100).toPrecision(4);

  const tableInfo = (
    data.map(info => {
      return (
       {
         id: id++,
         name: info.summonerName,
         lp: info.leaguePoints,
         total: parseInt(info.wins) + parseInt(info.losses),
         wins: info.wins,
         losses: info.losses,
         percent: precise(parseInt(info.wins) / (parseInt(info.wins) + parseInt(info.losses))) + "%"
       }
      )
    })  
  )

  const tableData = {
    columns: [
      {
        label: '#',
        field: 'id',
        sort: 'asc',
      },
      {
        label: "Summoner Name",
        field: "name",
        sort: "asc",
      },
      {
        label: "LP",
        field: "lp",
        sort: "desc",
      },
      {
        label: "Total Games",
        field: "total",
        sort: "asc",
      },
      {
        label: "Wins",
        field: "wins",
        sort: "asc",
      },
      {
        label: "Losses",
        field: "losses",
        sort: "asc",
      },
      {
        label: "Win Percent",
        field: "percent",
        sort: "asc",
      }
    ],
    rows: [
      ...tableInfo
    ]
  }

  return (
    <MDBDataTable
      className="RankTable"
      striped
      bordered
      hover
      data={tableData}
      order={['lp', 'desc']}
    />
  )
}

export default rankTable;