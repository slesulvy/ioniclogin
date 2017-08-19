import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import {
  NavController,
  NavParams,
  App,
  LoadingController,
  ToastController,
  ModalController,
  AlertController,
  Platform
} from 'ionic-angular';
import { LoginPage } from "../login/login";
import { AuthService } from "../../providers/auth-service";
import { Geolocation } from '@ionic-native/geolocation';
import { MarkerModelPage } from "../marker-model/marker-model";
// import { ModalAutocompleteItemsPage } from '../modal-autocomplete-items/modal-autocomplete-items';
//import { MapsAPILoader } from 'angular2-google-maps/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ConnectivityService } from '../../providers/connectivity-service';

import { MarkerEditPage } from "../marker-edit/marker-edit";


//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


declare var google: any;
//declare var window: any;
var markerIcon = '../../assets/icon/google-map-marker.png';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('searchbar', { read: ElementRef }) searchbar: ElementRef;
  addressElement: HTMLInputElement = null;

  map: any;
  infoWindows: any;

  loading: any;
  isLoggedIn: boolean = false;

  start: any;
  end: any;

  // test
  fromValue: string = "";
  toValue: string = "";
  place: string = "";
  geometry: any;

  // declear varibale to use for autocomplete search google maps
  firstTime: boolean = true;
  isDisplayOfflineMode: boolean = false;

  id: any;


  constructor(public navCtrl: NavController, public app: App, public authService: AuthService,
              public loadingCtrl: LoadingController, private toastCtrl: ToastController,
              public geolocation: Geolocation,
              public modalCtrl: ModalController, public platform: Platform,
              public navParams: NavParams
  ) {

    //if()

    if (localStorage.getItem("_token")) {
      this.isLoggedIn = true;
    }

    this.infoWindows = [];

    // test autocomplete
    this.fromValue = this.place;
    this.toValue = this.place;
  }

  ionViewDidLoad() {
    this.initMap();
    this.getCurrentLocaiton();
    this.addMarkerToCurrentLocation();
    this.getMarkers();
  }



  initMap() {

    let latLng = new google.maps.LatLng();

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

    //get the two fields
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
    //autocompleteFrom.bindTo('bounds', this.map);

    // we need to save a reference to this as we lose it in the callbacks
    let self = this;

    // add the first listener
    google.maps.event.addListener(autocompleteFrom, 'place_changed', function () {
      var place = autocompleteFrom.getPlace();
      let geometry = place.geometry;
      if ((geometry) !== undefined) {

        this.fromValue = place.name;

        //console.log("place name: " + place.name + "from value: " + this.fromValue);

        console.log(geometry.location.lng());

        console.log(geometry.location.lat());

        // infowindow.close();
        // marker.setVisible(false);
        // // var place = autocomplete.getPlace();
        // // if (!place.geometry) {
        // //   return;
        // // }

        // //If the place has a geometry, then present it on a map.
        // if (place.geometry.viewport) {
        //   this.map.fitBounds(place.geometry.viewport);
        // } else {
        //   this.map.setCenter(place.geometry.location);
        //   this.map.setZoom(17);  // Why 17? Because it looks good.
        // }
        // marker.setIcon(/** @type {google.maps.Icon} */({
        //   url: place.icon,
        //   size: new google.maps.Size(71, 71),
        //   origin: new google.maps.Point(0, 0),
        //   anchor: new google.maps.Point(17, 34),
        //   scaledSize: new google.maps.Size(35, 35)
        // }));
        // marker.setPosition(place.geometry.location);
        // marker.setVisible(true);

        // var address = '';
        // if (place.address_components) {
        //   address = [
        //     (place.address_components[0] && place.address_components[0].short_name || ''),
        //     (place.address_components[1] && place.address_components[1].short_name || ''),
        //     (place.address_components[2] && place.address_components[2].short_name || '')
        //   ].join(' ');
        // }


      }
    });


    // add the seconde listener

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

    // End of the test


    // var starFrom = (document.getElementById('start-input'));

    // var types = document.getElementById('type-selector');
    // this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(starFrom);
    // this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

    // var autocomplete = new google.maps.places.Autocomplete(starFrom);
    // autocomplete.bindTo('bounds', this.map);

    // // desination input feild
    // this.end = (document.getElementById('des-input'));

    // var types = document.getElementById('type-selector');
    // this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(this.end);
    // this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

    // var autocomplete = new google.maps.places.Autocomplete(this.end);
    // autocomplete.bindTo('bounds', this.map);


    // var infowindow = new google.maps.InfoWindow();
    // var marker = new google.maps.Marker({
    //   map: this.map
    // });

    // google.maps.event.addListener(autocomplete, 'place_changed', function () {
    //   infowindow.close();
    //   marker.setVisible(false);
    //   var place = autocomplete.getPlace();
    //   if (!place.geometry) {
    //     return;
    //   }

    //   //If the place has a geometry, then present it on a map.
    //   if (place.geometry.viewport) {
    //     this.map.fitBounds(place.geometry.viewport);
    //   } else {
    //     this.map.setCenter(place.geometry.location);
    //     this.map.setZoom(17);  // Why 17? Because it looks good.
    //   }
    //   marker.setIcon(/** @type {google.maps.Icon} */({
    //     url: place.icon,
    //     size: new google.maps.Size(71, 71),
    //     origin: new google.maps.Point(0, 0),
    //     anchor: new google.maps.Point(17, 34),
    //     scaledSize: new google.maps.Size(35, 35)
    //   }));
    //   marker.setPosition(place.geometry.location);
    //   marker.setVisible(true);

    //   var address = '';
    //   if (place.address_components) {
    //     address = [
    //       (place.address_components[0] && place.address_components[0].short_name || ''),
    //       (place.address_components[1] && place.address_components[1].short_name || ''),
    //       (place.address_components[2] && place.address_components[2].short_name || '')
    //     ].join(' ');
    //   }

    //   infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    //   infowindow.open(this.map, marker);
    // });


  }


  getCurrentLocaiton() {
    // watchPosition
    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude,
        position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 4,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      // display informantion window when found current location 
      this.infoWindows = new google.maps.InfoWindow;
      this.infoWindows.setPosition(latLng);
      this.infoWindows.setContent('Location found.');
      this.infoWindows.open(this.map);
      this.map.setCenter(latLng);

      // Call function Add marker to current location
      this.addMarkerToCurrentLocation();

    }, (err) => {
      console.log(err);
      alert("Geolocation is not supported");
    });

  }

  addMarkerToCurrentLocation() {

    let marker = new google.maps.Marker({
      map: this.map,
      //draggable: true,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter(),
      // icon: markerIcon
    });

  }


  addInfoWindow(marker) {

    var infoWindowContent = "<a href='#'>" + marker.title
      + "</a>" + "</br>" + marker.position
      + "</br><a id='editMarker'><span>edit</span></a>" + " | "
      + "<a ><span>delete</span></a>"
      +"<input type='hidden' id='markerId'></input>";

    console.log("marker:", marker)
    var infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });

    google.maps.event.addListener(marker, 'click', () => {
      google.maps.event.addListener(this.map, 'click', () => {
        infoWindow.close();
        marker.open = false;
      });

      if (infoWindow) {
        infoWindow.close();
        this.closeAllInfoWindows();
      }
      infoWindow.open(this.map, marker);

      this.infoWindows[0] = infoWindow;
    });

    //this.infoWindows.push(infoWindow);

    // add event listener to call a function
    google.maps.event.addListener(infoWindow, 'domready', () => {
      //now my elements are ready for dom manipulation
      //this.id = this.navParams.get('id');
      var editMarker = document.getElementById('editMarker');
      editMarker.addEventListener('click', () => {
        infoWindow.close();
        marker.open = false;
        this.showEdit(marker.id);
      });
    });

  }


  closeAllInfoWindows() {

    if (this.infoWindows.length > 0) {
      this.infoWindows[0].set("marker", null);
      this.infoWindows[0].close();
      this.infoWindows.length = 0;
    }
  }

  getDirection() {

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    // var map = new google.maps.Map(document.getElementById('map'), {
    //   zoom: 7,
    //   center: { lat: 41.85, lng: -87.65 }
    // });
    directionsDisplay.setMap(this.map);
    console.log("fromValue: " + this.fromValue);
    console.log("this.place:" + this.place);
    directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, function (response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });

  }

  getMarkers() {
    //console.log("Get all markers to this page");
    this.authService.getMarkersApi()
      .subscribe(items => {
        this.displayMarkerToMap(items);
        //console.log("items:", JSON.stringify(items));
      });

  }


  displayMarkerToMap(markers) {
    // console.log("displayMarkerToMap function");

    for (let marker of markers) {
      var position = new google.maps.LatLng(marker.latitude, marker.longitude);
      var contentMarker = new google.maps.Marker({
        position: position,
        title: marker.name,
        id: marker.id 
      });
      contentMarker.setMap(this.map);
      //console.log("mapsMarker:", mapsMarker);

      // Add inforWinow when user click on the marker
      this.addInfoWindow(contentMarker);
    }
  }

  logout() {

    localStorage.clear(); // clear localStorage data == clear _token

    this.loading = this.loadingCtrl.create({ content: 'logout' });
    this.loading.present();
    this.loading.dismiss();

    this.navCtrl.setRoot(LoginPage);
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
      console.log('Dismissed loast');
    });

    toast.present();
  }

  addNewMarkerModal() {
    //let markerDataPost = {latitude:'', longitude:'', name:'' };
    let myModal = this.modalCtrl.create(MarkerModelPage);
    myModal.present();
  }

  // All function below are using for autoComplete search
  // getDirections() { 
  //   window.location = `geo:${this.map.lat},${this.map.lng};u=35`; 
  // }

  getAotuCompleteMap() {

  }

  showEdit(id: any) {
    this.navCtrl.push(MarkerEditPage, {id});
  }

}
