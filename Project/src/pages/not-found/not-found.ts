import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NotFoundPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-not-found',
  templateUrl: 'not-found.html',
})
export class NotFoundPage {
  count=5
  canBack=false //布尔类型 开关/标志位

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotFoundPage')
    this.canBack = this.navCtrl.canGoBack();
    //console.log(this.navCtrl.canGoBack());
    if(!this.canBack){
      return
    }

    var myTimer = setInterval(()=>{
      console.log('....')
      this.count--
      if(this.count == 0){
        //关闭定时器
        clearInterval(myTimer)
        //返回上一页
        if(this.navCtrl.canGoBack()){
          this.navCtrl.pop()        
        }

      }
    },1000);
  }

}
