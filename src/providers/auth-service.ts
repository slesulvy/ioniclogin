import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
//import 'rxjs/add/observable/fromPromise';

//let apiUrl = 'http://localhost:3000/login';

let product = 'http://192.168.11.15/products';
let _token = 'http://192.168.11.15/';


@Injectable()
export class AuthService {

  constructor(public http: Http) {}

  apiUrl = 'http://192.168.11.15';
  token: any;
  // getToken(){
  //   return this.http.get(_token)
  //           .map((res) => res.json());
            
  // }

  login(credentials) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('_token'));
        this.http.post(this.apiUrl + '/api/ioniclogin', JSON.stringify(credentials), {headers: headers })
          .subscribe(res => {
            resolve(res.json());
            //console.log("my login: ", res.json());
          }, (err) => {
            console.log(err);
            reject(err);
          });
    });

  }

  register(data) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        // headers.append('Access-Control-Allow-Origin' , '*');
        // headers.append('Access-Control-Allow-Methods' , 'POST, GET, OPTIONS, PUT');
        // headers.append('Accept', 'application/json');
       headers.append('Content-Type' , 'application/x-www-form-urlencoded');
       // headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        this.http.post(this.apiUrl+'/api/ionicsave', JSON.stringify(data), {headers: headers})
          .subscribe(res => {
            resolve(res.json());
            
          }, (err) => {
            reject(err);
          });
    });
  }

  // addMap(data){
  //   return new Promise((resolve, reject) => {
  //     let headers = new Headers();
  //     headers.append('Content-Type', 'application/json');
  //     this.http.post(apiUrl+'/ionicAddMap', JSON.stringify(data), {headers: headers})
  //         .subscribe(res => {
  //           resolve(res.json());
            
  //         }, (err) => {
  //           reject(err);
  //         });
  //   });
  // }

  getMarkersApi(){
    return this.http.get(this.apiUrl + '/api/' + localStorage.getItem('_token') + '/markers')
            .map((res) => res.json());
  }

  // editMarker(id: number) {
  //   return this.http.get(`${this.apiUrl} + '/api/' + localStorage.getItem('_token') + '/markers'+${id}`)
  //                   .map((res) => res.json());
  // }
  editMarker(id: number) {
    return this.http.get(this.apiUrl + '/api/' + localStorage.getItem('_token') + '/markers/'+id)
                    .map((res) => res.json());
  }

  updateMarker(data) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        // headers.append('Access-Control-Allow-Origin' , '*');
        // headers.append('Access-Control-Allow-Methods' , 'POST, GET, OPTIONS, PUT');
        // headers.append('Accept', 'application/json');
       headers.append('Content-Type' , 'application/x-www-form-urlencoded');
       // headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        this.http.post(this.apiUrl+'/api/ionicupdate', JSON.stringify(data), {headers: headers})
          .subscribe(res => {
            resolve(res.json());
            
          }, (err) => {
            reject(err);
          });
    });
  }

}