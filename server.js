const express = require('express');
const connectDB = require('./config/db')
const app = express();


const PORT = process.env.PORT || 5000

//Connect Database 
connectDB();

//INIT middleware 
app.use(express.json({extended : false}))
//DEFINE Routes

app.use('/api/users',require('./routes/api/users'));
app.use('/api/vendors',require('./routes/api/vendors'));
app.use('/api/validate',require('./routes/api/validate'));

app.use('/api/distance',require('./routes/api/distance'));
app.use('/api/twowheeler',require('./routes/api/twowheeler'));




app.listen(PORT , () =>{
    console.log('**********************');
    console.log(`Server Started at ${PORT}`);
    console.log("***********************");
})


app.get('/',(req,res)=>{
    res.send('API Running');
})