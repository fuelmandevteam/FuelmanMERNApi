const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');


const connectDB = async() =>{
    try {
        await mongoose.connect(db,{ 
            createIndexes : true,
            useNewUrlParser: true,
            useUnifiedTopology : true
         } );
        console.log('Mongo db connected.......');
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}


module.exports = connectDB;