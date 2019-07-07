import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http'
import { DetailPage } from '../detail/detail';

/**
 * Generated class for the IndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {
  detail = DetailPage
  cList = []//保存的是轮播图数据
  nList = []
  rList = []
  value = ""
  constructor(
    private myHttp: HttpClient,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexPage');
    //发送请求
    var url = "http://dingxing.applinzi.com/index"
    this.myHttp.get(url).subscribe((result: any) => {
      console.log(result);
      //保存轮播图数据
      this.cList = result.carouselItems

      this.nList = result.newArrialItems

      this.rList = result.recommendedItems
      console.log(this.rList)
    })
  }

  doLoadMore(myRefresher) {

    // 因为数据请求太快，模拟一下延迟
    setTimeout(() => {
      var url = "http://dingxing.applinzi.com/index"
      this.myHttp.get(url).subscribe((result: any) => {
        console.log(result.topSaleItems);
        //保存下拉请求数据
        this.rList = this.rList.concat(result.topSaleItems)
      })
      // 告诉刷新组件，可以结束刷新动作
      myRefresher.complete()
    }, 1000)
  }
}
