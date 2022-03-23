require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

//routes
const UserRoutes = require('./routes/user')
const ShopRoutes = require('./routes/shop');
const ServiceRoutes = require('./routes/service');


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

const connect = mongoose.connection;
mongoose.connect(process.env.URL, {UseNewURLParser: true, UseUnifiedTopology: true});
connect.on('error', ()=> console.error.bind(console, 'Conection Error'));
connect.once('open', ()=> console.log('Connected to Database'));

app.use('/user', UserRoutes)
app.use('/shop', ShopRoutes)
app.use('/services', ServiceRoutes);

app.listen(process.env.PORT || process.env.LOCAL_PORT, ()=> console.log('Server is running'));