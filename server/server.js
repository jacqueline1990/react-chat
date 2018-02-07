const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const models = require('../server/models')
app.use(bodyParser.json())
app.use(cookieParser())
const server = require('http').Server(app)
const io = require('socket.io')(server)
const Chat = models.getModel('chat');
io.on('connection',function(socket){
     socket.on('sendMsg',function(data){
         const {from, to, content} = data
         const chatid= [from, to].sort().join('_')
         Chat.create({chatid, from, to, content},function(err,doc){
             if(!err){
                io.emit('recvmsg',doc)
             }
            
         })


     })
})
const UserRouter = require('./user');
app.use('/user',UserRouter)

server.listen(9093,function(){
    console.log('监听中');
})