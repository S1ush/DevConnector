const mongoose = require("mongoose");
const config = require("config");
const uri = config.get("mongoURI");

// // synchronous method
// mongoose.connect(db, { useNewUrlParser: true });

// Asychromous mehthod which is synchrous just to get error more profoundly

const connectDb = async () => {
	try {
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});

		console.log("..Mongoose Connected");
	} catch (err) {
		console.error(err.message);

		// exit process on failure

		process.exit(1);
	}
};

module.exports = connectDb;
