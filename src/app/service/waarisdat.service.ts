import { Injectable } from '@angular/core';
import { FirebaseService } from '../service/firebase.service';
import { Observable } from 'rxjs';

export interface AdminPageData {
  name: string;
  level: string;
  cover: boolean;
  quizName: string,
  lat: number;
  lng: number;
  urlImage: Observable<string>;
  uid: string;
}

export interface PhotoMetadata {
  uid?: string,
  name: string,
  imgUrl: string,
  lat: number,
  lng: number,
  level: number,
  cover: boolean,
  quizName: string,
  description: string,
  date: Date
}

export interface UserScore {
  name: string,
  score: number,
  scoreDetails: string,
  level: number,
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
  markersCorrect = [];
  userName: string = "";
  currentLevel: number = 1;
  currentNumberOfPhotos: number = 0;
  initializeQuiz: boolean = true;
  adminPageData: AdminPageData = <AdminPageData>{};

  constructor(
    private firebaseService: FirebaseService
  ) {

  }

  reset() {
    this.currentPhotoIndex = 0;
    this.currentNumberOfPhotos = 0;
    this.markersGuess = [];
    this.markersCorrect = [];
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

  async getPhotoMetadataListOfCurrentLevel() {
    if (this.currentLevel != null) {
      let result = await this.firebaseService.getPhotoMetadataOfLevel(this.currentLevel);
      console.log("getPhotoMetadataListOfCurrentLevel.result:" + this.currentLevel);
      return result;
    }
  }

  async getCoverList() {

    let result = await this.firebaseService.getCoverList();
    return result;

  }

  async getHighScore() {
    let result = await this.firebaseService.getHighScore();
    return result;

  }

  async addUserScore(userScore: UserScore) {
    let result = await this.firebaseService.addUserScore(userScore);
    return result;
  }
}
