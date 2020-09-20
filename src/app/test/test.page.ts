import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { PhotoMetadata } from '../service/waarisdat.service';
import { UserScore } from '../service/waarisdat.service';
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
    // console.log("test.ngOnInit()");

    // this.waarisdatService.getPhotoMetadataOfLevel(1).then(result => {
    //   for (var index in result) {
    //     var pmd: PhotoMetadata = result[index];
    //     console.log(pmd);
    //   }
    //});


  }
  onButton() {

    let ref = firebase.firestore().collection('photoMetadata');

    let result = ref
      .where("level", "==", 5)
      // .where("cover", "==", false) // do not get the cover photo's
      .get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.data().name);
        });
      });
    //this.router.navigate(["admin"]);
  }


  updateButton() {

    let ref = firebase.firestore().collection('photoMetadata');

    let result = ref
      // .where("level", "==", 5)
      .where("cover", "==", false) // do not get the cover photo's
      .get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          ref.doc(doc.id).update("cover", false)
        });
      });
    //this.router.navigate(["admin"]);
  }

  addUserScoreButton() {
    const userScore: UserScore = {
      name: 'rien',
      score: 220,
      level: 5,
      scoreDetails: "det",
      date: new Date()
    };
    this.waarisdatService.addUserScore(userScore).then(
      res => {
        console.log(res);
      }
    )
  }



  scoreButton() {
    this.waarisdatService.getHighScore().then(
      res => {
        res.forEach(function (doc: UserScore) {
          var d = doc.date.toDate();

          let formatted_date = d.toDateString();

          console.log(doc.name + " - " + doc.score + " op " + formatted_date);
        });
      }
    )
  }
}