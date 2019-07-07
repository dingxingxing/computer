import { Component } from '@angular/core';
import { ToastController,IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http'
import { LoginPage } from '../login/login';
import { IndexPage } from '../index';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  num=1
  myList=[] //保存成功获取到的购物车列表
  isAllSelected=false

  constructor(private toastCtrl:ToastController,private myHttp:HttpClient,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

  ionViewWillEnter(){
    var url="http://dingxing.applinzi.com/cart/list"
    this.myHttp.get(url,{withCredentials:true}).subscribe((result:any)=>{
      console.log(result)
      if(result.code==300){
        this.navCtrl.push(LoginPage)
      }else if(result.code==200){
        console.log("购物车列表获取成功",result)
        //保存result.data到视图中显示（购物车中有无数据，分为两种情况显示）
        this.myList=result.data;
        // 遍历this.myList数组，给每一个对象添加一个属性isSelected来记录是否被选中
        for(var i=0;i<this.myList.length;i++){
          this.myList[i].isSelected=false
        }
      }
    })
  }

  // 当全选的复选框被操作的时候，来执行该方法
  operateAll(){
    // 将购物车每个商品的isSelected修改为全选的复选框的是否选中
    for(var i=0;i<this.myList.length;i++){
      this.myList[i].isSelected=this.isAllSelected
    }
  }

  // 操作了购物车列表的某一个商品的复选框，要执行的方法
  operateSingle(){
    // 遍历购物车的每个商品做一个逻辑与运算，将最终结果赋值给this.isAllSelected
    var result=true
    for(var i=0;i<this.myList.length;i++){
    //  if(this.myList[i].isSelected==false){
    //   this.isAllSelected=false
    //  }else{
    //    this.isAllSelected=true
    //  }
    result=result&&this.myList[i].isSelected
    }
    this.isAllSelected=result
  }

  // 计算被选中的商品总价格
  calcAll(){
    var totalPrice=0
    for(var i=0;i<this.myList.length;i++){
      if(this.myList[i].isSelected){
        totalPrice+=(this.myList[i].price*this.myList[i].count)
      }
    }
    return totalPrice
  }

  // 删除购物车中选中的商品
  Cartdel(deleteId){//接收点击事件传过来的参数
    console.log(deleteId)
    var url="http://dingxing.applinzi.com/cart/del?iid="+deleteId
    this.myHttp.get(url,{withCredentials:true}).subscribe((result)=>{
      console.log(result);
      this.ionViewWillEnter();
    })
  }

  // 当购物车为空
  shopping(){
    this.navCtrl.push(IndexPage)
  }

  //购物车数量（+） 
  add(num,xid){
    console.log(num)
    num++;
    var url="http://dingxing.applinzi.com/cart/updatecount?iid="+xid+"&count="+num

    this.myHttp.get(url,{withCredentials:true}).subscribe((result)=>{
      console.log(result);
      this.ionViewWillEnter();
    })
  }
  // 购物车数量（-）
  sub(num,xid){
    var msg="" //提示信息
    if(num>1){
      num--;
    var url="http://dingxing.applinzi.com/cart/updatecount?iid="+xid+"&count="+num
    this.myHttp.get(url,{withCredentials:true}).subscribe((result)=>{
      console.log(result);
      this.ionViewWillEnter();
    })
    }else{
      msg="商品数量不可以为0哦！"
    }
    // 显示一个toast ToastController
    var myToast=this.toastCtrl.create({
      message:msg,
      duration:2000  //通知持续时间
    })
    myToast.present()
  } 
}
