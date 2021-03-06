import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AuthService } from "../../providers/auth-service";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  loading: any;
  regData = {email: '', password: '', table: 'user'};

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public authService: AuthService, public loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {}
  
  doSignup(){
    this.showLoader();
    //console.log("regData:", this.regData);
    this.authService.register(this.regData).then((result) => { 
     console.log(result);
      this.loading.dismiss();
      this.navCtrl.pop(); 
    }, (err) => {
      console.log(err);
      this.loading.dismiss();
      this.presentToast(err);
    });
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Authenicating...'
    });
    this.loading.present();
  }

  presentToast(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
