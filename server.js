const app = require('./app');

require('dotenv').config();

const {PORT} = process.env;

app.get('/', (req, res)=>{
    
    res.send('Welcome to the Budgeter App')
})

app.listen(PORT, () =>{

    console.log(`Listening to ${PORT}`)

})