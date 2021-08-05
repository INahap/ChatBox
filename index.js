const express = require('express');
const app = express();
const http = require('http');
const Msg = require('./models/messsages');
const ejs = require('ejs')
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const mongoose = require ('mongoose');

app.set('view engine' , 'ejs')

const mongo = "mongodb+srv://Ahmad-admin:admin@cluster0.1mx7l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(mongo , { useNewUrlParser: true , useUnifiedTopology: true }).then(()=>{
    console.log("connected")
}).catch(err => console.log("error" , err))

app.get('/', (req, res) => {
    Msg.find({},function(err,msgs){
      res.render('index',{
        DisplayMessages:msgs
      })
    })
  });

io.on('connection', (socket) => {
    Msg.find().then(result=>{
      socket.emit('output-messages',result)
    })

    socket.on('chat message', (msg) => {
      const message = new Msg({msg})

      message.save().then(()=>{
        io.emit('chat message', msg);
      })

    });
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});





