const express = require('express');
const router = express.Router();
const conn = require('../mariadb');

router.get('/', (req, res) => {
    res.send('ciao')

})

router.get('/testdb', (req, res) => {
    conn.query("SHOW TABLES;", function (err, result, fields) {
        console.log('porco gesu');
        if (err) throw err;
        console.log(fields)
        res.send(result);
      });
 }
)
// "headers": {'Set-Cookie': f'appfront-sess-cookie={cookie}; Max-Age=43600; Version=; Path=/'},
// va
router.post('/login', (req, res) => {
    const body = req.body;
    if (!('email' in body) || !('password' in body)) {
        return res.status(400).send('Email or Password missing!');
    }
    console.log(body)
    const email = body['email'];
    const password = body['password'];
    // console.log(email, password)
    // fetch db to find user and return it or throw error
    conn.query("SELECT id, email, token FROM users WHERE email = ? AND password = ? LIMIT 1;", [email, password], function (err, result) {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }
        if (result.length === 0) {
            return res.status(404).send('User not found!');
        }
        conn.query("UPDATE users SET login_cookie = ?, logged_in = 1 WHERE id = ?", [email, result[0]['id']]);
        console.log(`user ${[result[0]['id']]} status -> logged in.`)
        conn.query("INSERT INTO login_log (id, user_id, timein, timeout) values (NULL, ?, NOW(), NULL)", [result[0]['id']]);
        console.log(`user ${[result[0]['id']]} log registered.`)
        res.cookie('hush-sess-cookie', `${email}; Max-Age=43600; Version=; Path=/; SameSite=None`);
        
        res.status(200).send(result[0]);
    });
})

// va?
router.post('/logout', (req, res) => {
    const body = req.body;
    console.log(body)
    const email = body['email'];
    // fetch db to find user and return it or throw error
    conn.query("SELECT email FROM users WHERE email = ? AND logged_in = 1 LIMIT 1;", [email], function (err, result) {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }
        if (result.length === 0) {
            return res.status(404).send('User not found!');
        }
        conn.query("UPDATE users SET login_cookie = NULL, logged_in = 0 WHERE id = ?", [result[0]['mail']]);
        console.log(`user ${[result[0]['mail']]} status -> logged out.`);

;        // conn.query("UPDATE login_log SET timeou NOW() WHERE id = ?;", [result[0]['id']]);       res.status(200).send(result[0]);
    });
})

// va
router.post('/signup', (req, res) => {
    const body = req.body;
    console.log(body)
    if (!('email' in body) || !('password' in body)) {
        return res.status(400).send('Email or Password missing!');
    }
    const email = body['email'];
    const password = body['password'];
    // insert into new user
    conn.query("INSERT INTO users (id, email, password, logged_in, token) values (NULL, ?, ?, 0, 0);", [email, password], function (err, result) {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }
        if (result.length === 0) {
            return res.status(404).send('User already registered!');
        }
        console.log(`New user ${email} registered.`)    });
    conn.query("SELECT id, email FROM users WHERE email = ? AND password = ? LIMIT 1;", [email, password], function (err, result) {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }
        if (result.length === 0) {
            return res.status(404).send('User not found!');
        }
          return res.status(200).send(result[0])
    });
})

module.exports = router;