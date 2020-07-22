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
  markersCorrect = [];
  markersGuess = [];
  markers = [];
  userName: string = "";
  constructor(
    private firebaseService: FirebaseService
  ) {

  }

  reset() {
    this.currentPhotoIndex = 0;
    this.markersCorrect = [];
    this.markersGuess = [];
    this.markers = [];
    this.userName = "";
  }

  getPhotoMetadataList() {
    return this.firebaseService.getPhotoMetadataList();
  }
}
