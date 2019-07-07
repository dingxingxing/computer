//引入上一级目录下的mysql连接池对象
const pool=require('../pool.js');
const express=require('express');
//创建空路由器
var router=express.Router();
//添加路由
//1.用户注册
router.post('/register',(req,res)=>{
  //获取post请求的数据
  var obj=req.body;
  //判断用户名是否为空
  var $uname=obj.uname;
  if(!$uname){
    res.send({code:401,msg:'uname required'});
	//阻止继续往后执行
    return;
  }
  //验证密码、邮箱、手机是否为空
  var $upwd=obj.upwd;
  if(!$upwd){
    res.send({code:402,msg:'upwd required'});
	return;
  }
  //执行SQL语句，将注册的数据插入到xz_user数据表中，成功响应 {code:200,msg:'register suc'}
  pool.query('INSERT INTO xz_user SET ?',[obj],(err,result)=>{
    if(err) throw err;
	//是否添加成功
	if(result.affectedRows>0){
	  res.send({code:200,msg:'register suc'});
	}
  });
});
//2.用户登录路由
router.post('/login',(req,res)=>{
  var obj=req.body;
  console.log(obj)
  //验证数据是否为空
  var $uname=obj.uname;
  var $upwd=obj.upwd;
  if(!$uname){
    res.send({code:401,msg:'uname required'});
	return;
  }
  if(!$upwd){
    res.send({code:402,msg:'upwd required'});
	return;
  }
  //执行SQL语句，查看是否登录成功（使用用户名和密码两个条件能查询到数据）
  pool.query('SELECT * FROM xz_user WHERE uname=? AND upwd=?',[$uname,$upwd],(err,result)=>{
    if(err) throw err;
	//判断查询的结果（数组）长度是否大于0
	//如果大于0，说明查询到数据，有这个用户登录成功
	if(result.length>0){
    req.session.loginUname=$uname;
    req.session.loginUid=result[0].uid;
    console.log(req.session);
    res.send({code:200,msg:'login suc'});
	}else{
	  res.send({code:301,msg:'login err'});
	}
  });
});
//3.退出登录
router.get('/logout',(req,res)=>{
  req.session.destroy();
  res.send({code:200,msg:'logout succ'});
});
//4.返回当前登录用户的信息
router.get('/sessiondata',(req,res)=>{
  res.send({uid:req.session.loginUid,uname:req.session.loginUname});
});
//导出路由器
module.exports=router;