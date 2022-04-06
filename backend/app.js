const express = require('express');
const mongoose = require('mongoose');

const dbConfig = require('../backend/config/db.config');


const auth = require('./middleware/auth');
const error = require('./middleware/errors');

const unless = require('express-unless');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(
    ()=>{
        console.log('Database connected');
    },

    (error) =>{
        console.log('Database not connected'+error);
    }
);

auth.authenticateToken.unless = unless;

app.use(

    auth.authenticateToken.unless({

        path:[
        {url : "/users/login",method:["POST"]},
        {url : "/users/register",method:["POST"]},
        
    ],
    })
);

app.use(express.json());

app.use('/users',require("./routes/users.routes"));

app.use(error.errorHandler);
 
const port = process.env.PORT || 4000;
app.listen(port,()=>{
    console.log("server is running on port:" + port);
});