/**
 * Created by Administrator on 2016/11/17.
 */
var mongoose=require('mongoose');
var dbconfig=require('../dbconfig.js');
var ObjectId=mongoose.Schema.Types.ObjectId;

mongoose.connect(dbconfig.dburl);
//创建数据库模型
    var userSchema=new mongoose.Schema({
        username:String,
        password:String,
        email:{type:String,default:''},
        avatar:{type:String},
        createTime:{type:Date,default:new Date().now}
    });
exports.User=mongoose.model('userinfo',userSchema);
var articleSchema=new mongoose.Schema({
    title:String,
    user:{type:ObjectId,ref:'userinfo'},
    content:String,
    createTime:{type:Date,default:new Date().now}
});
exports.Article=mongoose.model('article',articleSchema);