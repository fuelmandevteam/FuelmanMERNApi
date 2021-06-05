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


app.listen(PORT , () =>{
    console.log('**********************');
    console.log(`Server Started at ${PORT}`);
    console.log("***********************");
})


app.get('/',(req,res)=>{
    res.send('API Running');
})