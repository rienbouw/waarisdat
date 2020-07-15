import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { FirebaseService } from '../service/firebase.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  @ViewChild('imageProd') inputimageProd: ElementRef;
  id: any;
  uid: string;
  name: any;
  phone: string;
  adress: string;
  img: any;
  mail: string;
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  item: any;
  username: string;

  cp: Boolean;

  constructor(private rout: Router,
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private afs: AngularFireStorage,
    private loadingController: LoadingController,
    private aut: AngularFireAuth) {
  }

  ngOnInit() {
    this.logueado();
  }




  logueado() {
    this.aut.authState
      .subscribe(
        user => {
          if (user) {
            this.mail = user.email;
            this.uid = user.uid;
            console.log(this.mail);
            this.getProfile(this.uid);
          }
        });
  }

  async getProfile(id) {

    console.log('profile empty');

  }


  onUpload(e) {
    console.log(e.target.files[0]);

    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `photo/${id}`;
    const ref = this.afs.ref(filePath);
    const task = this.afs.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    this.presentLoading();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }


  save(name, phone, adress, username) {
    console.log(this.cp);
    const image = this.inputimageProd.nativeElement.value;
    const data = {
      name: name,
      level: phone,
      mail: this.mail,
      img: image || this.img,
      adress: adress,
      uid: this.uid,
      username: username || 'null'
    };
    console.log(data);
    if (this.cp === false) {
      this.firebaseService.createPhoto(data).then(
        res => {
          console.log('Upload' + res);
        });
    }

  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading image',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }
  moveFocus(nextElement) {
    nextElement.setFocus();
  }

}
