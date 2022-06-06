var express = require('express');
var router = express.Router();
const cors = require('cors');

router.use(cors());


router.post('/', function(req, res, next) {

    req.app.locals.con.connect((err) => {

        if(err){console.log(err);}

        let sql = `
            SELECT nanoid
            FROM users
            WHERE username = '${req.body.username}' AND password = '${req.body.password}'
        `;

        req.app.locals.con.query(sql, (err, result) => {
            if(err){console.log(err);}

            res.send(result);
        });
    });

});

module.exports = router;
