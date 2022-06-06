var express = require('express');
var router = express.Router();
const cors = require('cors');

router.use(cors());


router.post('/create', function(req, res, next) {

    req.app.locals.con.connect((err) => {

        if(err){console.log(err);}

        let sql = `
            INSERT INTO documents (userNanoid, title, description, content)
            VALUES (${req.body.userNanoid}, '${req.body.title}', '${req.body.description}', '${req.body.content}')
        `;


        req.app.locals.con.query(sql, function(err, result){
            if(err){console.log(err);}
        });

    });

});


router.post('/retrieve', function(req, res){

    req.app.locals.con.connect((err) => {

        if(err){console.log(err);}

        let sql = `
            SELECT title, description, content
            FROM documents
            WHERE userNanoid = '${req.body.userNanoid}'
        `;

        req.app.locals.con.query(sql, function(err, result){
            if(err){console.log(err);}

            res.send(result);
        });

    });

});




module.exports = router;
