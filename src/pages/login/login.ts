import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { HomePage } from "../home/home";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


  loading: any;
  TOKEN: any;
  //loginData = {username: '', password:'', email: '', phoneNum: '', lat: 11.54651, lng: 104.8920};
  loginData = { email: 'davy@gmail.com', password: '123' };
  data: any;
  token: object[];
  constructor(public navCtrl: NavController, public authService: AuthService,
    public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
  }


  doLogin() {
    //this.authService.login(this.loginData);
    this.showLoader();
    //console.log("loginData:", this.loginData);
    this.authService.login(this.loginData).then((result) => {
      this.loading.dismiss();
      this.data = result;
      console.log("data:", this.data.users[0]);
      if (this.data.users.length > 0) {
        localStorage.setItem('_token', this.data.users[0]['_token']);
        this.navCtrl.setRoot(HomePage);
      } else {
        alert("incorrect email or password!");
        this.navCtrl.setRoot(LoginPage);
      }

      //console.log(this.data.access_token);
      //localStorage.setItem('token', '9r1ezijSRwXHxdOshSaYy956FgdWEAGPL0tZtHKK');

    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);

    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad LoginPage');
    // this.authService.getToken()
    // .subscribe(
    //   data => this.loginData._token = data._token,
    //   error => alert(error),
    //   () => console.log(JSON.stringify(this.loginData))
    // );
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }



}
