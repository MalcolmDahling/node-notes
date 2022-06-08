const express = require('express');
const router = express.Router();
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


router.post('/getAll', function(req, res){

    req.app.locals.con.connect((err) => {

        if(err){console.log(err);}

        let sql = `
            SELECT id, title, description, content
            FROM documents
            WHERE userNanoid = '${req.body.userNanoid}'
        `;

        req.app.locals.con.query(sql, function(err, result){
            if(err){console.log(err);}

            res.send(result);
        });

    });

});


router.post('/getOne', function(req, res){

    req.app.locals.con.connect((err) => {

        if(err){console.log(err);}

        let sql = `
            SELECT id, title, description, content
            FROM documents
            WHERE userNanoid = '${req.body.userNanoid}' AND id = '${req.body.id}'
        `;

        req.app.locals.con.query(sql, function(err, result){
            if(err){console.log(err);}
            
            res.send(result);
        });

    });

});


router.post('/update', function(req, res){

    req.app.locals.con.connect((err) => {

        if(err){console.log(err);}

        let sql = `
            UPDATE documents
            SET title = '${req.body.title}', description = '${req.body.description}', content = '${req.body.content}'
            WHERE id = '${req.body.id}' AND userNanoid = '${req.body.userNanoid}'
        `;

        req.app.locals.con.query(sql, function(err, result){
            if(err){console.log(err);}

            res.send('OK');
        });

    })
});


router.post('/delete', function(req, res){

    req.app.locals.con.connect((err) => {

        let sql = `
            DELETE FROM documents
            WHERE id = '${req.body.id}' AND userNanoid = '${req.body.userNanoid}'
        `;

        req.app.locals.con.query(sql, function(err, result){
            if(err){console.log(err);}

            res.send('OK');
        });

    });

});




module.exports = router;
