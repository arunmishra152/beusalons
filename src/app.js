const express = require('express')
require('./db/mongoose')
const user = require('./routers/user')
const order = require('./routers/order')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(user)
app.use(order)
app.listen(port,()=>{
    console.log('server is running on port ' + port)
});