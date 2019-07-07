import { Component } from '@angular/core';
import { ToastController,IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  myName="" //保存的是输入框的用户名
  myPwd=""  //保存的是输入框的密码

  constructor(private toastCtrl:ToastController,private myHttp:HttpClient,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  doLogin(){
    // 获取用户名和密码
    console.log(this.myName,this.myPwd);

    // 发起一次post请求，验证用户名密码是否正确
    var url="http://dingxing.applinzi.com/user/login"
    this.myHttp.post(
      url,
      {uname:this.myName,upwd:this.myPwd},
      {withCredentials:true}
      )
    .subscribe((result:any)=>{
      console.log(result)
      if(result.code==200){
        // 登录成功返回上一页
        this.navCtrl.pop()
      }else{
        // 登录失败，显示toast
        this.toastCtrl.create({
          message:"用户名或密码错误",
          duration:2000
        }).present()
      }
    })
  }
  
}
