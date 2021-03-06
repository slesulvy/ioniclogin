import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  //tab1Root = HomePage;
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = LoginPage;

  constructor(public navCtrl: NavController) {
    if(!localStorage.getItem("_token")){
      navCtrl.setRoot(LoginPage);
    }else{
      navCtrl.setRoot(HomePage);
    }
  }
}
