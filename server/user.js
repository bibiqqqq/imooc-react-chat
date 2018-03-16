const express = require('express')
const Router = express.Router()
const models = require('./model')
const User = models.getModel('user')
const Chat = models.getModel('chat')
const utils = require('utility')

const _filter = {'pwd': 0, '__v': 0}

Router.get('/list', function (req, res) {
  const { type } = req.query
  // User.remove({}, function (err, doc) {  })
  User.find({type}, function (err, doc) {
    return res.json({code:0,data:doc})
    })
})
Router.get('/getmsglist', function (req,res) {
  const user = req.cookies.userid
  User.find({}, function (e, userdoc) {
    let users = {}
    userdoc.forEach(v=>{
      users[v._id] = {name: v.user, avatar:v.avatar}
    })
    Chat.find({'$or':[{from:user},{to:user}]}, function (err, doc) {
      if(!err) {
        return res.json({code:0, msgs: doc, users: users})
      }
    })
  })
  
})

Router.post('/readmsg', function (req, res) {
  const userid = req.cookies.userid
  const {from} = req.body
  Chat.update({from, to:userid},{'$set':{read:true}},{'multi': true},function (err,doc) {
    if(!err){
      return res.json({code:0, num:doc.nModified})
    }
    return res.json({code:1,msg: '修改失败'})
  })
})

  Router.post('/update',function(req,res){
    const userid = req.cookies.userid
    if (!userid) {
      return json.dumps({code:1})
    }
    const body = req.body
    User.findByIdAndUpdate(userid,body,function(err,doc){
      const data = Object.assign({},{
        user:doc.user,
        type:doc.type
      },body)
      return res.json({code:0,data})
    })
  })
Router.post('/login', function (req, res) {
  const {user, pwd} = req.body
  User.findOne({user, pwd: md5Pwd(pwd)},_filter, function (err, doc) {
    if (!doc) {
      return res.json({code: 1, msg: '用户名或者密码错误'})
    }
    res.cookie('userid', doc._id)
    return res.json({code: 0, data: doc})
    })
  })
Router.post('/register', function (req, res) {
  console.log(req.body.data)
  const {user, pwd, type} = req.body
  User.findOne({user}, function (err,doc) { 
    if (doc) {
      return res.json({code: 1, msg: '用户名重复'})
    }
    const userModel = new User({user, pwd: md5Pwd(pwd), type})
    userModel.save(function (err, doc) {
      if(err) {
        return res.json({code: 1, msg: '后端出错了'})
      }
      const {user, type, _id} = doc
      res.cookie('userid', _id)
      return res.json({code: 0, data: {user}})
    })
   })
  })
Router.get('/info', function (req, res) {
  const {userid} = req.cookies
  if(!userid) {
    res.json({code: 1})
  }
  User.findOne({_id: userid}, function (err, doc) {
    if(err) {
      return res.json({code: 1, msg: '后端出错了'})
    }
    if (doc) {
      return res.json({code: 0, data: doc})
    }
    }) 
    // 用户有没有cookie
    
  })

function md5Pwd(pwd) { 
  const salt = 'imooc_is_good_3942xdfd!jnd2'
  return utils.md5(utils.md5(pwd + salt))
 }
module.exports = Router