"# 20180625-express-demo" 

# Launch MongoD

    mkdir -p data
    mongod -d data

# Import the data

    mongo < create-customers.js

# Start the Express Server:

    node ./bin/www

Open browser to http://localhost:3000

