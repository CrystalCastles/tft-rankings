var express = require("express");
var router = express.Router();
const fetch = require('node-fetch');
// const { Kayn, REGIONS } = require('kayn')

const API_KEY = process.env.API_KEY;

// const kayn = Kayn(API_KEY)({
//     region: REGIONS.NORTH_AMERICA,
//     locale: "en_US",
//     debugOptions: {
//       isEnabled: true,
//       showKey: false
//     },
//     requestOptions: {
//       shouldRetry: true,
//       numberOfRetriesBeforeAbort: 3,
//       delayBeforeRetry: 1000,
//       burst: false,
//       shouldExitOn403: false
//     },
//     cacheOptions: {
//       cache: null,
//       timeToLives: {
//         useDefault: false,
//         byGroup: {},
//         byMethod: {}
//       }
//     }
//   });

router.post('/region', async(req, res) => {
    const region = req.body.region;
    const challengers = await getTFTChallengers(region);
    res.send(challengers);
})

// router.get("/", async(req, res, next) => {
//     // const { summonerName } = "imaqtpie";
//     // const user = await getSummonerByName(summonerName);
//     // const challengers = await getTFTChallengers();

//     const challengers = await getTFTChallengers();
//     res.send(challengers);
// });

async function getTFTChallengers(region) {
    let tftChallengers; 
    await fetch(`https://${region}.api.riotgames.com/tft/league/v1/challenger?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            tftChallengers = data;
        })
        .catch(err => {
            console.log(`Error fetching TFT challengers: ${err}`);
        })
    return tftChallengers;
}

// async function getSummonerByName(summonerName) {
//     const summoner = await kayn.Summoner.by.name(summonerName);
//     return summoner;
// }

// async function getTFTChallengers() {
//     const tftChallengers = await kayn.Challenger.list("RANKED_TFT");
//     return tftChallengers;
// }

module.exports = router;