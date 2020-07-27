import { Injectable } from '@angular/core';
import { FirebaseService } from '../service/firebase.service';
import { Observable } from 'rxjs';

export interface PhotoMetadata {
  uid?: string,
  name: string,
  imgUrl: string,
  lat: number,
  lng: number,
  level: number,
  description: string,
  date: Date
}

@Injectable({
  providedIn: 'root'
})
export class WaarisdatService {
  currentPhotoIndex: number = 0;
  //markersCorrect = [];
  markersGuess = [];
  markers = [];
  userName: string = "";
  currentLevel: number;
  initializeQuiz: boolean = true;

  constructor(
    private firebaseService: FirebaseService
  ) {

  }

  reset() {
    this.currentPhotoIndex = 0;
    // this.markersCorrect = [];
    this.markersGuess = [];
    this.markers = [];
    this.userName = "";
    this.initializeQuiz = true;
  }

  getPhotoMetadataList() {
    return this.firebaseService.getPhotoMetadataList();
  }

  getPhotoMetadataOfLevel(level: number) {
    return this.firebaseService.getPhotoMetadataOfLevel(level);
  }

  getPhotoMetadataListOfCurrentLevel() {
    return this.firebaseService.getPhotoMetadataOfLevel(this.currentLevel);
  }
}

