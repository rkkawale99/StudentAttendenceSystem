const connectToMongo = require("./db")
const express = require("express")
const cors = require('cors')
const port = 5000

connectToMongo();
const app = express();


app.use(express.json())
app.use(cors())

//Available routes
app.use('/api/auth' , require('./routes/auth'))
app.use('/api/batches' , require('./routes/batch'))
app.use('/api/sessions' , require('./routes/session'))

app.listen(port, ()=>{
    console.log(`app listening on ${port}`);
    
})


