"# 20180625-express-demo" 

# Launch MongoD

    mkdir -p data
    mongod -d data

# Import the data

    mongo < create-customers.js

# Start the Express Server:

    node ./bin/www

Open browser to http://localhost:3000



# Install Newman

    npm install -g newman



Postman/Newman verification of API:

    newman run test\WeasleyAPI.postman_collection.json



Command line verification of API

# (reset data as above and cd into test directory):

    mongo < create-customers.js
    cd test

# Retrieve all Customers

    curl -H "Content-Type: application/json" -X POST -d @snape.json http://localhost:3000/api/customers

# Retrieve Ginny Weasley

    curl -H "Accept: application/json" -X GET http://localhost:3000/api/customers/7

# Delete Draco Malfoy (and verify deletion)

    curl -H "Content-Type: application/json" -X DELETE -d @malfoy.json http://localhost:3000/api/customers
    curl -H "Accept: application/json" -X GET http://localhost:3000/api/customers/15

# Update Ginny (and verify update)

    curl -H "Content-Type: application/json" -X PUT -d @ginny_update.json http://localhost:3000/api/customers
    curl -H "Accept: application/json" -X GET http://localhost:3000/api/customers/7