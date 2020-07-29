import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { FirebaseService } from '../service/firebase.service';
import { PhotoMetadata } from '../service/waarisdat.service';
import { WaarisdatService } from "../service/waarisdat.service";
import { AdminPageData } from "../service/waarisdat.service";

//import * as exif from 'exif-js';
import exifr from 'exifr'

@Component({
  selector: 'app-edit-profile',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  @ViewChild('imageProd') inputimageProd: ElementRef;
  adminPageData: AdminPageData = <AdminPageData>{};
  id: any;
  uid: string;
  marker: any;
  adress: string;
  img: string;
  mail: string;
  uploadPercent: Observable<number>;
  item: any;
  username: string;
  cp: Boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private firebaseService: FirebaseService,
    private afs: AngularFireStorage,
    private loadingController: LoadingController,
    private aut: AngularFireAuth,
    public waarisdatService: WaarisdatService
  ) {
  }

  ngOnInit() {
    this.adminPageData = this.waarisdatService.adminPageData;
    var lat = this.activatedRoute.snapshot.paramMap.get('lat');
    var lng = this.activatedRoute.snapshot.paramMap.get('lng');
    if (lat != null) {
      this.adminPageData.lat = Number(lat);
      this.adminPageData.lng = Number(lng);
    }
  }

  // logueado() {
  //   this.aut.authState
  //     .subscribe(
  //       user => {
  //         if (user) {
  //           this.mail = user.email;
  //           this.uid = user.uid;
  //           //console.log(this.mail);
  //           this.getProfile(this.uid);
  //         }
  //       });
  // }

  // async getProfile(id) {

  //   //console.log('profile empty');

  // }

  getLocationFromMap() {
    this.waarisdatService.adminPageData = this.adminPageData;
    console.log(this.adminPageData.name);
    this.router.navigate(["map", { back: "admin" }]);
  }

  async onUpload(e) {
    var latlng = await exifr.gps(e.target.files[0]);
    if (latlng != null) {
      this.adminPageData.lat = latlng.latitude;
      this.adminPageData.lng = latlng.longitude;
    }
    //   function ConvertDMSToDD(degrees, minutes, seconds, direction) {

    //     var dd = degrees + (minutes / 60) + (seconds / 3600);

    //     if (direction == "S" || direction == "W") {
    //       dd = dd * -1;
    //     }

    //     return dd;
    //   }
    //   var allMetaData = exif.getAllTags(this);
    //   console.log(allMetaData);
    //   var latDegree = exif.getTag(this, "GPSLatitude")[0].numerator;
    //   var latMinute = exif.getTag(this, "GPSLatitude")[1].numerator;
    //   var latSecond = exif.getTag(this, "GPSLatitude")[2].numerator;
    //   var latDirection = exif.getTag(this, "GPSLatitudeRef");
    //   console.log(latDegree);
    //   console.log(latMinute);
    //   console.log(latSecond);
    //   console.log(latDirection);

    //   var lat = ConvertDMSToDD(latDegree, latMinute, latSecond, latDirection);
    //   console.log(lat);

    // });

    this.uid = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `photo/${this.uid}`;
    const ref = this.afs.ref(filePath);
    const task = this.afs.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    //   this.presentLoading();
    task.snapshotChanges().pipe(finalize(() => this.adminPageData.urlImage = ref.getDownloadURL())).subscribe();
  }



  // loaded(e) {
  // }

  save() {
    const image = this.inputimageProd.nativeElement.value;
    const data: PhotoMetadata = {
      name: this.adminPageData.name,
      level: Number(this.adminPageData.level),
      lat: this.adminPageData.lat,
      lng: this.adminPageData.lng,
      imgUrl: image || this.img,
      description: "",
      uid: this.uid,
      date: new Date()
    };
    console.log(data);
    this.firebaseService.addPhotoMetadata(data).then(
      res => {
        console.log('Upload' + res);
      });

  }


  // async presentLoading() {
  //   const loading = await this.loadingController.create({
  //     message: 'Foto wordt opgeslagen..',
  //     duration: 2000
  //   });
  //   await loading.present();

  //   const { role, data } = await loading.onDidDismiss();

  //   //console.log('Loading dismissed!');
  // }

  // moveFocus(nextElement) {
  //   nextElement.setFocus();
  // }

}
