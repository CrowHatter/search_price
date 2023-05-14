var express = require('express');
var router = express.Router();

var sqlite = require('sqlite3').verbose();
db = new sqlite.Database("./db.sqlite", sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

router.post('/', (req, res) => {
    const {movie, quote, character}=req.body;
    sql = "INSERT INTO quote (movie, quote, character) VALUES (?, ?, ?)";
    db.run(sql, [movie, quote, character], (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('inserted');
    });
    res.redirect('/insert.html');
    return res.status(200).send('inserted');
})

router.get('/', function(req, res, next) {
    const Q = req.query;
    console.log(Q);
    console.log(Q['name'],Q['date'],Q['price']);
    let sql = "SELECT * FROM "+ Q['name'] +" WHERE date <= "+ Q['date'] +" AND price <" +Q['price'];
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
});

module.exports = router;