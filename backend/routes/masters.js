var express = require("express");
var router = express.Router();
const fetch = require('node-fetch');

const API_KEY = process.env.API_KEY;

router.post("/region", async(req, res, next) => {
    const region = req.body.region;
    const masters = await getTFTMasters(region);
    res.send(masters);
});

async function getTFTMasters(region) {
    let tftMasters;
      await fetch(`https://${region}.api.riotgames.com/tft/league/v1/master?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            tftMasters = data;
        })
        .catch(err => {
            console.log(`Error fetching TFT masters: ${err}`);
        })
    return tftMasters;
}

module.exports = router;