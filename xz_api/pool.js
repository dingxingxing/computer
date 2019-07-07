const mysql=require('mysql');
//创建连接池对象
var pool=mysql.createPool({
  host:'w.rdc.sae.sina.com.cn',
  port:'3306',
  user:'l3om1zl34k',
  password:'2101x4133lxjzw2wk1w2xmz55y43255ykxy0z4jm',
  database:'app_dingxing',
  connectionLimit:20,
  multipleStatements:true
});
//导出连接池对象
module.exports=pool;


