// it contain detail of lecture second from 'hello world'
// to stop the server ctrl+c command should run in terminal

const express = require('express')

const app = express()

// app.get have 2 parameters=> 1.(in which end point we want to show the data)
//                             2.(finction of request and respose in which what data going to show on perticular path or end point)
app.get('/', (req, res) => {
  res.send('Hello sir')
})

app.get('/rice', (req, res) => {
  res.send('sure sir i would love to serve rice')
})

app.get('/idli', (req, res) => {
    var customized_idli={
        name: "rava idli",
        size:"10cm diameter",
        is_sambhar:true,
        is_chatani: false
    }
    res.send(customized_idli)
})

app.post('/person',(req,res)=>{
  console.log('data is saved');
  res.send('hye person');
})
// port address on which our page shown or render
// port address ex-> 3000 and we pass callback function which basically help use to see server is running or not
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
