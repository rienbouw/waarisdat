import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { PhotoMetadata } from '../service/waarisdat.service';
import { WaarisdatService } from "../service/waarisdat.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  photoMetadataList: Array<PhotoMetadata>;

  constructor(
    public afs: AngularFirestore,
    public waarisdatService: WaarisdatService,
    private router: Router
  ) {

  }

  ngOnInit() {
    console.log("test.ngOnInit()");

    this.waarisdatService.getPhotoMetadataOfLevel(1).then(result => {
      for (var index in result) {
        var pmd: PhotoMetadata = result[index];
        console.log(pmd);
      }
    });


  }
  onButton() {
    this.router.navigate(["admin"]);
  }
}

