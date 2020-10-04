const express = require("express");
const connectDb = require('./config/db')
const app = express();

// Connect database
connectDb();

app.get("/", (req, res) => res.send("API Running "));

// Define routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running at PORT : ${PORT}`));
