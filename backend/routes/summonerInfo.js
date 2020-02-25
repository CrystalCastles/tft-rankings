var express = require("express");
var router = express.Router();
const fetch = require('node-fetch');

const API_KEY = process.env.API_KEY;

router.post('/summoner-name', async(req, res) => {
  const summonerName = req.body.summonerName;
  const region = req.body.region;
  console.log(summonerName)
  const sumInfo = await getSummonerInfo(summonerName, region);
  res.send(sumInfo);
})

async function getSummonerId(name, reg) {
  let summonerId;
  await fetch(`https://${reg}.api.riotgames.com/tft/summoner/v1/summoners/by-name/${name}?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
        summonerId = data.id;
    })
    .catch(err => {
        console.log(`Error fetching summoner ID: ${err}`);
    })
  return summonerId;
}

async function getSummonerInfo(name, reg) {
  const id = await getSummonerId(name, reg);

  let summonerInfo;
  await fetch(`https://${reg}.api.riotgames.com/tft/league/v1/entries/by-summoner/${id}?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
        summonerInfo = data;
    })
    .catch(err => {
        console.log(`Error fetching summoner info: ${err}`);
    })
    return summonerInfo;
}

module.exports = router;