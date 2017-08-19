import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from "@angular/http";
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MarkerModelPage } from "../pages/marker-model/marker-model";
import { ModalAutocompleteItemsPage } from '../pages/modal-autocomplete-items/modal-autocomplete-items';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth-service';

import { LoginPage } from "../pages/login/login";
import { RegisterPage } from "../pages/register/register";
import { MarkerEditPage } from "../pages/marker-edit/marker-edit";

import { Geolocation } from "@ionic-native/geolocation";

//import { Storage, IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    MarkerModelPage,
    ModalAutocompleteItemsPage,
    MarkerEditPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    //IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    MarkerModelPage,
    ModalAutocompleteItemsPage,
    MarkerEditPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    //Storage
  ]
})
export class AppModule {}
