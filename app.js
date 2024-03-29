const express= require('express');
const mongoose=require('mongoose');
const path=require('path');
const bodyParser=require('body-parser');
const cors=require('cors');
const config=require('./config/database');
const logger = require('morgan');
var passport = require('passport');




//ucitavamo servise
const users=require('./routes/users');

const articles=require('./routes/articles');
const delivers=require('./routes/delivers');
const orders=require('./routes/orders');
const stocks=require('./routes/stocks');
const supplier=require('./routes/supplier');
const types=require('./routes/types');

const app=express();
//konektujemo se na bazu
mongoose.connect(config.database,{ useNewUrlParser: true , useUnifiedTopology: true });
mongoose.connection.on('connected',()=>{
    console.log('Connected to detabase: '+config.database);
});
mongoose.connection.on('error',(err)=>{
    console.log('Error with connection to db: '+err);
});

require('./config/passport');

app.set('views', __dirname + '/public');
app.set('view engine', 'html');

//staticki direktorijum bice ./public
//app.use(express.static(path.join(__dirname,'public')));
//gommila postavki nodejs servera

app.use(cors());
app.use(express.static(path.join(__dirname,'public')));
app.use(logger('dev'));
app.use(bodyParser.json());

//navodimo nasted putanje iz servisa
app.use('/users',users);

app.use('/articles',articles);
app.use('/delivers',delivers);
app.use('/orders',orders);
app.use('/stocks',stocks);
app.use('/supplier',supplier);
app.use('/types',types);


app.get('**',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html');
});


//startujemo server na portu 8080
const port= process.env.PORT || 8080;
app.listen(port,()=>{
    console.log("server started on port: "+port);
});