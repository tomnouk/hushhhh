const express = require('express');
const router = express.Router();
const conn = require('../mariadb');

// Define a route
router.get('/', (req, res) => {
    res.send('main audio rout "localhost:<port>/audio"')
});

router.post('/store', (req, res) => {
    const body = req.body;
    console.log(body);
    // const id = body['id']
    // per ora do per scontato sia user 1
    const lat = body['lat'];
    const long = body['long'];
    const mag = body['mag'];
    if (lat === 0 || long === 0 || mag === 0)
        return res.status(404).send('Missing Datas.');
    conn.query("INSERT INTO user_log (id, user_id, timestamp, latitude, longitude, magnitude) VALUES (NULL, 1, NOW(), ?, ?, ?);", [lat, long, mag], function (err, result) {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }
        console.log(`Data sent from id = 1: longitude ${long} latitude ${lat} magnitude ${mag}.`);
    });
    return res.status(204);
})

router.get('/get', (req, res) => {
    // fetch db
    conn.query("SELECT latitude, longitude, magnitude FROM user_log;", function (err, result) {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }
        if (result.length === 0) {
            // console.log(`No data available for the selected interval`);
            return res.status(404).send(`No data available!`);
        }
        return res.status(200).send(result);
    });
});

module.exports = router;