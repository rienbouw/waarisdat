import { Component, OnInit } from "@angular/core";

import { Plugins } from "@capacitor/core";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { ToastController } from "@ionic/angular";
import { GoogleMap, Marker, MarkerOptions, GoogleMapsAnimation, GoogleMapsEvent } from "@ionic-native/google-maps";
import { WaarisdatService } from "../service/waarisdat.service";

// declare var google;

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page implements OnInit {
  lat: number;
  lng: number;
  selectedMarker;
  address: string;
  googleMap: any;

  constructor(
    private http: HttpClient,
    public toastController: ToastController,
    public waarisdatService: WaarisdatService
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


  }

  onMapReady(map: any) {
    console.log(map);
    this.googleMap = map;
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
        console.log(this.address);
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
    alert("Marker Data: " + params);
    let marker: Marker = <Marker>params[1];
    let customInfo: any = marker.get('customInfo');
    alert("Custom Info: " + customInfo);
    let iconData: any = marker.get('iconData');
    marker.setIcon(iconData);

    this.presentToast();
  }

  onMapClick(event) {
    console.log(this.waarisdatService.currentPhotoIndex);
    this.selectedMarker = {
      lat: event.coords.lat,
      lng: event.coords.lng
    };
    this.getAddress(event.coords.lat, event.coords.lng).subscribe(decodedAddress => {
      this.address = decodedAddress;
      //let currentPhotoIndex: any = Tab2Page.get_CurrentPhotoIndex();
      alert(this.address);
    });

  }
}