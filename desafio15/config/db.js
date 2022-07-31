const dotenv = require('dotenv');
dotenv.config();
const MONGO_URL = process.env.MONGODB;

const config ={
    port: process.env.PORT || 8080,
    CORS: process.env.CORS || '*',

}

const mongodb ={

    URL:MONGO_URL,
    options:{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
}

module.exports = {
    config,
    mongodb
}