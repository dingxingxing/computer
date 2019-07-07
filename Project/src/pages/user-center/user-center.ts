import { Component } from '@angular/core';
import { ToastController,IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http'


/**
 * Generated class for the UserCenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-center',
  templateUrl: 'user-center.html',
})
export class UserCenterPage {

  constructor(private toastCtrl:ToastController,private myHttp:HttpClient,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserCenterPage');
  }

  // 退出登录
  logou(){
    var msg=""
    var url="http://dingxing.applinzi.com/user/logout"
    this.myHttp.get(url,{withCredentials:true}).subscribe((result)=>{
      console.log(result);
      
       this.navCtrl.parent.select(0);
    })
    msg="您已退出登录！"
    var myToast=this.toastCtrl.create({
      message:msg,
      duration:2000  //通知显示时间
    })
    myToast.present();
  }
}
