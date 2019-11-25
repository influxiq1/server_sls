/**
 * Created by debasiskar on 07/09/19.
 */
const mongoose = require('mongoose')
//mongoose.connect(process.env.DB)


const MongoClient = require('mongodb').MongoClient

// Note: A production application should not expose database credentials in plain text.
// For strategies on handling credentials, visit 12factor: https://12factor.net/config.
const PROD_URI = "mongodb+srv://devel:DQvi4qOUXE32AUU4@cluster0-kdod7.mongodb.net/test?retryWrites=true&w=majority";
//const PROD_URI = "mongodb://<dbuser>:<dbpassword>@<host1>:<port1>,<host2>:<port2>/<dbname>?replicaSet=<replicaSetName>"
//const MKTG_URI = "mongodb://<dbuser>:<dbpassword>@<host1>:<port1>,<host2>:<port2>/<dbname>?replicaSet=<replicaSetName>"

function connect(url) {
    return MongoClient.connect(url).then(client => client.db())
}

module.exports = async function() {
    let databases = await Promise.all([connect(PROD_URI)])

    return
         databases[0];
        //marketing: databases[1]

}