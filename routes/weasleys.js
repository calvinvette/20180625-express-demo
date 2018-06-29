var express = require('express');
var router = express.Router();

function getNextSequenceValue(db, sequenceName){
    return db.get("counters").findOneAndUpdate(
        { name : sequenceName },
        { $inc:{sequence_value:1}},
        { new:true }
    );
    // return sequenceDocument.sequence_value;
}

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
    });
});

// http://localhost:3000/api/customers/7 for Ginny
router.get('/customers/:customerId', function (req, res, next) {
    const customerId = req.params["customerId"];
    req.db.get('customers').find({customerId: customerId}, {}, (e, results) => {
        // It comes back as an array - should we strip it off as a single result?
        // This should be a unique or null result
        if (results && results.length !== 0) {
            res.json(results);
        }
        else {
            res.status(404).send({error: "No Customers found."});
        }
    });
});

router.post('/customers', function (req, res, next) {
    let customer ;
    try {
        customer = JSON.parse(req.body);
    } catch (e) {
        customer = req.body;
    }
    getNextSequenceValue(req.db, "customerId")
        .then(sequence => {
            console.log(sequence);
            customer.customerId = sequence.sequence_value.toString();
            console.log(customer);
            req.db.get("customers").insert(customer, {}, (error, results) => {
                if (!error) {
                    res
                        .status(201) // Created Successfully
                        // .status(204) // Created Successfully; No body content/JSON to send back
                        .location(req.originalUrl.endsWith("/") ? "" : "/" + customer.customerId) // URL to find customer
                        .json(customer)
                        .end();
                } else {
                    res.status(500).send({error: "Failed to create customer: " + error.message});
                }
            });
        });
});

router.put('/customers', function (req, res, next) {
    let customer ;
    try {
        customer = JSON.parse(req.body);
    } catch (e) {
        customer = req.body;
    }
    req.db.get("customers").findOneAndUpdate({customerId: customer.customerId}, customer, (error, results) => {
        if (!error) {
            res
                .status(201) // Updated Successfully
                // .status(204) // Updated Successfully; No body content/JSON to send back
                .location(req.originalUrl.endsWith("/") ? "" : "/" + customer.customerId) // URL to find customer
                .json(customer)
                .end();
        } else {
            res.status(500).send({error: "Failed to update customer: " + error.message});
        }
    });
});

router.delete('/customers', function (req, res, next) {
    let customer ;
    try {
        customer = JSON.parse(req.body);
    } catch (e) {
        customer = req.body;
    }
    req.db.get("customers").findOneAndDelete({customerId: customer.customerId}, {}, (error, results) => {
        if (!error) {
            res
                .status(201) // Deleted  Successfully
                // .status(204) // Deleted Successfully; No body content/JSON to send back
                .json(customer)
                .end();
        } else {
            res.status(500).send({error: "Failed to delete customer: " + error.message});
        }
    });
});

module.exports = router;
