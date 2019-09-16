var express = require("express");
var router = express.Router();
const fetch = require('node-fetch');

const API_KEY = process.env.API_KEY;

router.post("/region", async(req, res, next) => {
    const region = req.body.region;
    const grandmasters = await getTFTGrandmasters(region);
    res.send(grandmasters);
});

async function getTFTGrandmasters(region) {
    let tftGrandmasters;
      await fetch(`https://${region}.api.riotgames.com/lol/league/v4/grandmasterleagues/by-queue/RANKED_TFT?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            tftGrandmasters = data;
        })
        .catch(err => {
            console.log(`Error fetching TFT grandmasters: ${err}`);
        })
    return tftGrandmasters;
}

module.exports = router;