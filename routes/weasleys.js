var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('Weasleys REST API'); // WADL document listing supported APIs?
});

router.get('/customers', function (req, res, next) {
    req.db.get('customers').find({}, {}, (e, results) => {
        if (results) {
            res.json(results);
        }
        else {
            res.status(404).send({error: "No Customers found."});
        }
        ;
    });
});

module.exports = router;
