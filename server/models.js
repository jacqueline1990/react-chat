const mongoose = require('mongoose');
const CONNECT_URL = 'mongodb://localhost:27017/hanyi-chat';
mongoose.connect(CONNECT_URL);

const models = {
    user : {
        username: {type:String, require:true},
        pwd: {type:String, require:true},
        type: {type:String, require:true},
        avatar: {type:String},
        desc: {type:String, default:'还没有具体信息呢'},
        title: {type:String},
        company: {type:String},
        money: {type:String}
    },
    chat : {
        chatid: {type:String, require:true},
        from: {type:String, require:true},
        to: {type:String, require:true},
        content: {type:String, require:true},
        read: {type:Boolean, default:false},
        create_time:{type:Number,default:new Date().getTime()}
    }
}

for (let key in models){
mongoose.model(key,new mongoose.Schema(models[key]));
}

module.exports={
    getModel:function(m){
        return mongoose.model(m);
    }
}