import { Component, OnInit } from "@angular/core";

import { Plugins } from "@capacitor/core";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { ToastController } from "@ionic/angular";
import { GoogleMap, Marker, MarkerOptions, GoogleMapsAnimation, GoogleMapsEvent } from "@ionic-native/google-maps";
import { WaarisdatService } from "../service/waarisdat.service";
import { Router } from '@angular/router';
//import { get } from 'scriptjs';

declare var klokantech;
declare var google;

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class MapPage implements OnInit {
  lat: number;
  lng: number;
  markers = [];
  newMarker;
  address: string;
  googleMap: any;

  constructor(
    private http: HttpClient,
    public toastController: ToastController,
    public waarisdatService: WaarisdatService,
    private router: Router
  ) { }

  ngOnInit() {
    // call get current location function on initializing
    this.getCurrentLocation();

    // this.googleMap.addListener('click', function (e) {
    //   this.placeMarker(e.latLng, this.googleMap);
    // });

    //   this.googleMap.addListener('click', function(e) {
    //     placeMarker(e.latLng, map);
    // });
    // this.googleMap.on("click", e => {
    //   console.log(e.latlng); // get the coordinates
    //   let marker = new google.maps.Marker(e.latlng)
    //   marker.setMap(this.googleMap)
    // });

    this.waarisdatService.markersCorrect[0] = new google.maps.LatLng(52.076789403954095, 5.129023292050916);
    this.waarisdatService.markersCorrect[1] = new google.maps.LatLng(52.09858353293515, 5.111449956866156);
    this.waarisdatService.markersCorrect[2] = new google.maps.LatLng(52.08605556641818, 5.117765557501341);
    this.waarisdatService.markersCorrect[3] = new google.maps.LatLng(52.0820819114837, 5.133151195699135);
    this.waarisdatService.markersCorrect[4] = new google.maps.LatLng(52.097271420058796, 5.126982463612952);

  }

  mapReady(map) {
    this.googleMap = map;

    this.googleMap.addListener("dragend", function () {
      //console.log("dragend");
    });

    for (let i = 0; i < this.markers.length; i++) {
      console.log("aici")
      new google.maps.Marker({
        position: { lat: this.markers[i].lat, lng: this.markers[i].long },
        map: map,
      });
    }
  }

  // placeMarker(position, map) {
  //   var marker = new google.maps.Marker({
  //     position: position,
  //     map: map
  //   });
  //   map.panTo(position);
  // }


  //Function to get the current geo position of the device

  getCurrentLocation() {
    Plugins.Geolocation.getCurrentPosition().then(result => {
      this.lat = result.coords.latitude;
      this.lng = result.coords.longitude;

      //  calling getAddress function to decode the address

      this.getAddress(this.lat, this.lng).subscribe(decodedAddress => {
        this.address = decodedAddress;
        console.log("getCurrentLocation: " + this.address);
      });
    });
  }

  //This function makes an http call to google api to decode the cordinates

  private getAddress(lat: number, lan: number) {
    return this.http
      .get<any>(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lan}&key=${
        environment.googleMapsAPIKey
        }`
      )
      .pipe(
        map(geoData => {
          if (!geoData || !geoData.results || geoData.results === 0) {
            return null;
          }
          return geoData.results[0].formatted_address;
        })
      );
  }

  // function to display the toast with location and dismiss button

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.address,

      position: "middle",
      buttons: [
        {
          icon: "close-circle",
          role: "cancel"
        }
      ]
    });
    toast.present();
  }

  // click function to display a toast message with the address

  onMarkerClick(params: any) {
    //alert("Marker Data: " + params);
    let marker: Marker = <Marker>params[1];
    let customInfo: any = marker.get('customInfo');
    //alert("Custom Info: " + customInfo);
    let iconData: any = marker.get('iconData');
    marker.setIcon(iconData);

    this.presentToast();
  }

  onMapClick(lat: number, lng: number) {
    //console.log(lat, lng);
    var newMarker = {
      lat, lng, alpha: 1,
      icon: {
        url: 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + (this.waarisdatService.currentPhotoIndex + 1) + '|f5f242|000000',
        scaledSize: {
          width: 30,
          height: 40
        }
      },
      photoNumber: this.waarisdatService.currentPhotoIndex + 1
    };

    if (this.markers[this.waarisdatService.currentPhotoIndex] == null) {
      this.markers.push(newMarker);
    } else {
      this.markers[this.waarisdatService.currentPhotoIndex] = newMarker;
    }
    this.waarisdatService.markersGuess[this.waarisdatService.currentPhotoIndex] = newMarker; //new google.maps.LatLng(lat, lng);
    console.log("this.waarisdatService.markersCorrect[" + this.waarisdatService.currentPhotoIndex + "] = new google.maps.LatLng(" + lat + ", " + lng + ");");
    // setTimeout(() => {
    //   this.router.navigate(['/tabs/photo']);
    // },
    //   1000);

    // this.newMarker = {
    //   lat: lat,
    //   lng: lng,
    //   icon: 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + (this.waarisdatService.currentPhotoIndex + 1) + '|FF0300|000000'
    // };

    // this.getAddress(lat, lng).subscribe(decodedAddress => {
    //   this.address = decodedAddress;
    //   //console.log(this.address);
    //});
    //console.log("onMapClick() xxexit");
  }

  markerDragEnd(marker: any, lat: number, lng: number) {
    let photoNumber = marker["photoNumber"];
    console.log("Photonumber " + photoNumber + " new position " + lat, lng);
    // var repositionedMarker = {
    //   lat, lng, alpha: 1,
    //   icon: {
    //     url: 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + (this.waarisdatService.currentPhotoIndex + 1) + '|f5f242|000000',
    //     scaledSize: {
    //       width: 30,
    //       height: 40
    //     }
    //   },
    //   photoNumber: marker["photoNumber"]
    // };
    for (var index in this.waarisdatService.markersGuess) {
      let guessMarker = this.waarisdatService.markersGuess[index];
      if (guessMarker["photoNumber"] == photoNumber) {
        guessMarker["lat"] = lat;
        guessMarker["lng"] = lng;
      }
      //this.waarisdatService.markersGuess[marker["photoNumber"]-1] = repositionedMarker;
    }
  }

  protected mapLoad(map) {
    //console.log("mapLoad: + " + map);
    //this.renderGeolocationControl(map);
  }

  // renderGeolocationControl(map) {
  //   get('https://cdn.klokantech.com/maptilerlayer/v1/index.js', () => {
  //     const geoloccontrol = new klokantech.GeolocationControl(map, 18);
  //     console.log(geoloccontrol);
  //   });
  // }

}