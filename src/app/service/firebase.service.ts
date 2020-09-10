import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { PhotoMetadata } from '../service/waarisdat.service';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private snapshotChangesSubscription: any;
  private photoMetadataList: Array<PhotoMetadata>;
  private photoMetadataCollection: AngularFirestoreCollection<PhotoMetadata>;


  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {
    this.photoMetadataCollection = this.afs.collection<PhotoMetadata>('photoMetadata');


    this.photoMetadataCollection.snapshotChanges().subscribe(
      data => {
        this.photoMetadataList = data.map(a => {
          const pmd = a.payload.doc.data() as PhotoMetadata;
          //console.log(pmd);
          return pmd;
        })
      });
  }

  getUidsForLevel(level) {
    var subset = this.afs.collection('photoMetadata').get()
    console.log(subset);
  }

  addPhotoMetadata(photoMetadata: PhotoMetadata): Promise<DocumentReference> {
    //console.log("Save photo metadata for " + photoMetadata.uid);
    return this.photoMetadataCollection.add(photoMetadata);
  }

  createPhotoMetadata(value) {

    return new Promise<any>((resolve, reject) => {
      this.afs.collection(`photo/${value.uid}/metadata`).add({
        name: value.name,
        level: value.level,
        cover: value.cover,
        img: value.img,
        uid: value.uid,
        //   lat: value.lat,
        //  lng: value.lng,
        date: Date.now()
      })
        .then(
          res => resolve(res),
          err => reject(err)
        )
    });
  }

  getPhotoMetadataList() {
    //console.log("getPhotoMetadataList()");
    return this.photoMetadataList;
  }


  async getPhotoMetadataOfLevel(level) {
    if (level != null) {
      const snapshot = await firebase.firestore().collection('photoMetadata')
        .where("level", "==", level)
        .where("cover", "==", false) // do not get the cover photo's
        .get()
      return snapshot.docs.map(a => {
        const pmd = a.data() as PhotoMetadata;
        return pmd;
      });
    }
  }

  async getCoverList() {
    const snapshot = await firebase.firestore().collection('photoMetadata')
      .where("cover", "==", true)
      .orderBy("level", "asc")
      .get()
    return snapshot.docs.map(a => {
      const pmd = a.data() as PhotoMetadata;
      return pmd;
    });
  }

  getHighScore() {
    //  return new Promise<any>((resolve, reject) => {
    //  this.afAuth.user.subscribe(currentUser => {
    let currentUser = { uid: "gek" };
    if (currentUser) {
      //      let ref = this.afs.collection('people').doc(currentUser.uid).collection('tasks');
      let ref = firebase.firestore().collection('photoMetadata');

      let result = ref.get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
          });
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    }
    //    })
    //   })
  }

  getTask(taskId) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if (currentUser) {
          this.snapshotChangesSubscription = this.afs.doc<any>('people/' + currentUser.uid + '/tasks/' + taskId).valueChanges()
            .subscribe(snapshots => {
              resolve(snapshots);
            }, err => {
              reject(err)
            })
        }
      })
    });
  }

  unsubscribeOnLogOut() {
    //remember to unsubscribe from the snapshotChanges
    this.snapshotChangesSubscription.unsubscribe();
  }

  updateTask(taskKey, value) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid).collection('tasks').doc(taskKey).set(value)
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  deleteTask(taskKey) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid).collection('tasks').doc(taskKey).delete()
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  createTask(value) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid).collection('tasks').add({
        title: value.title,
        description: value.description,
        image: value.image,
        date: value.date,
        userName: value.userName
      })
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux: any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };

  uploadImage(imageURI, randomId) {
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('image').child(randomId);
      this.encodeImageUri(imageURI, function (image64) {
        imageRef.putString(image64, 'data_url')
          .then(snapshot => {
            snapshot.ref.getDownloadURL()
              .then(res => resolve(res))
          }, err => {
            reject(err);
          })
      })
    })
  }
}
