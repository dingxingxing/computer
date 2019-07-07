import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {HttpClientModule} from '@angular/common/http'
// import {FormsModule} from '@angular/forms'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IndexPage } from '../pages/index';
import { CartPage } from '../pages/cart/cart';
import { DetailPage } from '../pages/detail/detail';
import { OrderConfirmPage } from '../pages/order-confirm/order-confirm';
import { PayPage } from '../pages/pay/pay';
import { UserCenterPage } from '../pages/user-center/user-center';
import { NotFoundPage } from '../pages/not-found/not-found';
import { LoginPage } from '../pages/login/login';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    IndexPage,
    CartPage,
    DetailPage,
    OrderConfirmPage,
    PayPage,
    UserCenterPage,
    NotFoundPage,
    LoginPage
  ],
  imports: [
    // FormsModule,
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    IndexPage,
    CartPage,
    DetailPage,
    OrderConfirmPage,
    PayPage,
    UserCenterPage,
    NotFoundPage,
    LoginPage,
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
