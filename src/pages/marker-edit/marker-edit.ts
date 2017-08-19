import { Component } from '@angular/core';
import { IonicPage, NavController, 
        NavParams, LoadingController,
        ViewController } from 'ionic-angular';
import { AuthService } from "../../providers/auth-service";

@IonicPage()
@Component({
  selector: 'page-marker-edit',
  templateUrl: 'marker-edit.html',
})
export class MarkerEditPage {

  id: number;
  mydata: any;
  loading: any;
  marker = {name: '', latitude: '', longitude: '', id: '',_token: localStorage.getItem('_token'), table: 'markers'};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public authService: AuthService,
              public loadingCtrl: LoadingController,
              public viewCtrl: ViewController) {

             this.mydata = {};

  }

  ionViewDidLoad() {
    this.showEdit();
    //console.log(this.mydata);
  }

  showEdit(){
     this.id = this.navParams.get('id');
      this.authService.editMarker(this.id).subscribe(data => {
        this.mydata = data;
        //console.log("my data json: ",JSON.stringify(data));
      });
  }

  editSave(){
    this.authService.updateMarker(this.mydata).then((result) => { 
     //console.log(result);
     this.mydata + localStorage.getItem('_token') + 'markers';
     console.log(this.mydata);
      this.loading.dismiss();
      this.navCtrl.pop(); 
    }, (err) => {
      console.log(err);
      this.loading.dismiss();
      //this.presentToast(err);
    });
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'loading...'
    });
    this.loading.present();
  }

  closeModal(){
    this.viewCtrl.dismiss();
    this.ionViewDidLoad();
  }

}
