const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// // synchronous method 
// mongoose.connect(db, { useNewUrlParser: true });

// Asychromous mehthod which is synchrous just to get error more profoundly

const connectDb = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

        console.log('..Mongoose Connected')

    } catch (err) {
        console.error(err)

        // exit process on failure

        process.exit(1)
    }
};



module.exports = connectDb;