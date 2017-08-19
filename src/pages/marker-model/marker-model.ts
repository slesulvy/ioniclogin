import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, ViewController, LoadingController, NavController } from 'ionic-angular';
import { AuthService } from "../../providers/auth-service";
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the MarkerModelPage page.
 *
 * Author: Sles Ulvy
 * This page for call popup to create new marker
 */

declare var google: any;


@IonicPage()
@Component({
  selector: 'page-marker-model',
  templateUrl: 'marker-model.html',
})
export class MarkerModelPage {


  @ViewChild('map') mapElement: ElementRef;

  loading: any;
  ht: string;
  err: any;
  map: any;
  fromValue: any;

  mapData = {name: '', latitude: '', longitude: '', rules: 'name,required|regex:/(^[A-Za-z0-9 ]+$)+/,latitude,required',_token: localStorage.getItem('_token'), table: 'markers'};

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, 
              public loadingCtrl: LoadingController, public authService: AuthService) {
       // this.initMap();
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  addMap(){
    // this.authService.getToken()
    // .subscribe(
    //   data => this.mapData._token = data._token,
    //   error => alert(error),
    //   () => console.log(JSON.stringify(this.mapData))
    // );
    //console.log(this.mapData);
    //alert(1);
    // this.showLoader();
    // this.loading.dismiss();
    this.showLoader();
    //console.log("regData:", this.regData);
    this.authService.register(this.mapData).then((result) => { 
     console.log("my data:", this.mapData);
     //console.log("result:",result);
      this.err=JSON.stringify(result);
      console.log(this.err);
      //this.ht=this.err.mapData.rules;
      this.loading.dismiss();
      //this.navCtrl.pop();
    }, (err) => {
      console.log(err);
      this.loading.dismiss();
      //this.presentToast(err);
    });

  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Adding...'
    });
    this.loading.present();
  }

  initMap() {

    let latLng = new google.maps.LatLng(11.551604, 104.861883);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
      // controls: {
      //   compass: true,
      //       myLocationButton: true,
      //       indoorPicker: true,
      //       zoom: true
      // }
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    // get the two fields
    let input_from = (<HTMLInputElement>document.getElementById("journey_from"));
    let input_to = (<HTMLInputElement>document.getElementById("journey_to"));

    // set the options
    let options = {
      types: [],
      componentRestrictions: { country: "KH" }
    };

    var types = document.getElementById('type-selector');
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input_from);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input_to);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

    // create the two autocompletes on the from and to fields
    let autocompleteFrom = new google.maps.places.Autocomplete(input_from, options);
    let autocompleteTo = new google.maps.places.Autocomplete(input_to, options);

    // we need to save a reference to this as we lose it in the callbacks
    let self = this;

    // add the first listener

    google.maps.event.addListener(autocompleteTo, 'place_changed', function () {

      this.place = autocompleteTo.getPlace();
      let geometry = this.place.geometry;
      if ((geometry) !== undefined) {

        this.toValue = this.place.name;
        console.log("this.toValue: ", this.toValue);

        console.log(geometry.location.lng());

        console.log(geometry.location.lat());
      }
    });

    // add the second listener
    google.maps.event.addListener(autocompleteFrom, 'place_changed', function () {
      this.place = autocompleteFrom.getPlace();
      let geometry = this.place.geometry;
      if ((geometry) !== undefined) {

        this.fromValue = this.place.name;

        console.log("place name: " + this.place.name + "from value: "+ this.fromValue);

        console.log(geometry.location.lng());

        console.log(geometry.location.lat());
      }
    });

    console.log("out: " + this.fromValue);

  }
}
