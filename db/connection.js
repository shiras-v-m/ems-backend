const mongoose = require('mongoose')

//to get  connection string from .env : process.env
const connectionString = process.env.DATABASE


//connect node app with mongodb  using connection string with  help of mongoose

mongoose.connect(connectionString,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("Mongodb atlas Connented Succesfully...");
}).catch((error)=>{
    console.log("Mongodb atlas Connention error..."+error);
})