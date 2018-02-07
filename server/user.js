const express = require('express')
const Router = express.Router()
const User = require('./models').getModel('user')
const Chat = require('./models').getModel('chat')
const utils = require('utility')
const _filter = {'pwd':0,'__v':0}
Router.get('/test',function(req,res){
    //  User.create({username:'hanyi',pwd:'xx',type:'test'},function(err,doc){
    //      res.json(doc)
    //  })
    // Chat.remove({},function(err,doc){
    //     console.log(doc,'????')
    // })
    Chat.find({},function(err,doc){
        res.json(doc)
    })
})
Router.get('/info',function(req,res){
    console.log('----ss')
    const userid = req.cookies.userid;
    if(!userid){
        res.json({code:1})
    }
    User.findOne({_id:userid},_filter,function(err,doc){
        console.log('@@@',doc)
         if(err){
             res.json({code:1,msg:'信息出错'})
         }
         if(doc){
             res.json({code:0,data:doc})
         }
    })
    
})
Router.post('/register',function(req,res){
    const {username,pwd,type} = req.body
    User.findOne({username},function(err,doc){
        if(doc){
            return res.json({code:1,msg:'用户名已经被注册过'})
        }

        User.create({username,pwd:secret(pwd),type},function(err,doc){
            if(!err){
                res.cookie('userid',doc._id)
                return res.json({code:0,data:{username,type,id:doc._id}})
            }
            return res.json({code:1,msg:'后端信息错误'})
    
        })

    })
  
})
Router.post('/login',function(req,res){
    const {username,pwd} = req.body;
    User.findOne({username,pwd:secret(pwd)},_filter,function(err,doc){
        if(!doc){
            return res.json({code:1,msg:'密码错误或者没有该用户'})
        }
        res.cookie('userid',doc._id);
        return res.json({code:0,data:doc})
    })
})
Router.post('/update',function(req,res){
    const { userid }= req.cookies;
    if(!userid){
        res.json({code:1,msg:'没有用户信息'})
    }
    User.findByIdAndUpdate(userid,{'$set':req.body},function(err,doc){
        if(err){
            res.json({code:1,msg:'后端出错'})
        }
        if(doc){
            const data = Object.assign({},{username:doc.username,type:doc.type},req.body);
            res.json({code:0,data})
        }
    })
})
Router.post('/userlist',function(req,res){
    const {type} = req.body
    User.find({type},_filter,function(err,doc){
        if(err){
            res.json({code:1,msg:'后端处理错误'})
        }
        if(doc){
            res.json({code:0,data:doc})
        }
    })
    
})
Router.get('/getchatlist',function(req,res){
    const { userid } = req.cookies;
    let users = {}
    User.find({},function(err,doc){
        doc.map(v=>{
            users[v._id] = {username:v.username,avatar:v.avatar}
        })
          
        Chat.find({'$or':[{from:userid},{to:userid}]},function(err,d){
            if(!err){
                res.json({code:0,data:d,users})
            }
        })
    })
  
})
Router.post('/changeRead',function(req,res){
    const { from } = req.body;
 
    console.log('信息来自',from)
    const { userid } = req.cookies
    Chat.update({from,to:userid},{'$set':{read:true}},{multi:true},function(err,doc){
        if(doc){
            res.json({code:0,num:doc.nModified})
        }
      
    })
})
function secret(pwd){
    const str ='hanyishimeinv$%^#@'+utils.md5(pwd);
    return utils.md5(str);
}
module.exports=Router;