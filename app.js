const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const loginRouter = require('./login2');
const formRouter = require('./form'); 
// const loginRouter2 = require('./login');

app.use(loginRouter);
app.use(formRouter);

app.listen(3000, () => console.log('Server started'));