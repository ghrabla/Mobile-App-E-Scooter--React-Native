const express = require("express"); // import express
const dotenv = require("dotenv").config(); // import dotenv
const colors = require("colors"); // import colors
const { errorHandler } = require("./middleware/errorMiddleware"); // custom error handler
const port = process.env.PORT || 6000; // set our port
const app = express();
const cors = require("cors");
const connectDB = require("./config/db"); // import db connection
const cookieParser = require('cookie-parser'); // import cookie parser

connectDB(); // connect to db

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(
    
));

app.use(cookieParser());

app.use("/user", require("./routes/userRoutes"));
app.use("/admin", require("./routes/adminRoutes"));

app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));
