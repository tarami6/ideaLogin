const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true, useFindAndModify: true,  useUnifiedTopology: true, useCreateIndex: true })
        console.log("MongoDb Connected")
    } catch (e) {
        console.error(e.message)
        // Exit proccess with failure
        process.exit(1)
    }
}

module.exports = connectDB;
