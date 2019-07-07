const express=require('express');
//引入连接池
const pool=require('../pool.js');
//创建空路由器
var router=express.Router();
//创建路由

//2.商品详情
router.get('/detail',(req,res)=>{
  var output={
    details:{},
    family:{}
  };
  //获取数据，
  var obj=req.query;
  var $lid=obj.lid;
  if(!$lid){
    res.send({code:401,msg:'lid required'});
	  return;
  }
  //执行SQL语句，把查询的数据响应给浏览器
  pool.query('SELECT * FROM xz_laptop WHERE lid=?',[$lid],(err,result)=>{
    if(err) throw err;
    //判断数据是否为空
    if(result.length==0){
      res.send({code:301,msg:'detail err'});
    }else{
      output.details=result[0];
      var lid=result[0].lid;
      var fid=result[0].family_id;
      var sql=`
      SELECT * FROM xz_laptop_pic WHERE laptop_id=${lid} ORDER BY pid;
      SELECT * FROM xz_laptop_family WHERE fid=${fid};
      SELECT lid,spec FROM xz_laptop WHERE family_id=${fid};
      `;
      pool.query(sql,(err,result)=>{
        output.details.picList=result[0];
        output.family=result[1][0];
        output.family.laptopList=result[2];
      });
      setTimeout(() => {
        res.send(output);
      }, 100);
      
    }
  });
});
//3.商品删除
router.get('/delete',(req,res)=>{
  //获取数据
  var obj=req.query;
  var $lid=obj.lid;
  //验证是否为空
  if(!$lid) {
    res.send({code:401,msg:'lid required'});
	return;
  }
  //执行SQL语句
  pool.query('DELETE FROM xz_laptop WHERE lid=?',[$lid],(err,result)=>{
	if(err) throw err;
    //判断affectedRows属性值是否大于0
	if(result.affectedRows>0){
	  res.send({code:200,msg:'delete suc'});
	}else{
	  res.send({code:301,msg:'delete err'});
	}
  });
});
//4.商品添加
router.post('/add',(req,res)=>{
  //获取数据
  var obj=req.body;
  //console.log(obj);
  //判断是否为空
  //遍历对象的属性
  var $code=400;
  for(var key in obj){
	$code++;
    //console.log(key+'---'+obj[key]);
	//判断属性值是否为空
	if(!obj[key]){
	  res.send({code:$code,msg:key+' requried'});
	  return;
	}
  }
  //执行SQL语句
  pool.query('INSERT INTO xz_laptop SET ?',[obj],(err,result)=>{
    if(err) throw err;
	//console.log(result);
	if(result.affectedRows>0){
	  res.send({code:200,msg:'add suc'});
	}
  });
});
//导出路由器
module.exports=router;
//在app.js服务器文件中挂载到/product下