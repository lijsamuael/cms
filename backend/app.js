
const express=require("express")
const app=express()
const cors=require('cors')
const PORT=5000
const patientRoutes=require('./routes/patientRoutes')
const loginRoutes=require('./routes/loginRoute')
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.listen(PORT,()=>{
    console.log(`app running on port ${PORT}`)
})
app.use('/patients', patientRoutes);
app.use('/authenticate',loginRoutes);

