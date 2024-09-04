const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

})

router.get('/find/:id', (req, res) => {
    // get user by id
    const id = req.query.id;
    conn.query("SELECT id, mail FROM users WHERE is = ?;", [id], function (err, result) {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }
        if (result.length === 0) {
            console.log(`No user with id ${id}.`);
            return res.status(404).send(`No user with id ${id}.`);
        }
        console.log(`Found user ${id}.`);
        return res.status(200).send(result);
    });
})


module.exports = router;