import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WaarisdatService {
  currentPhotoIndex: number = 0;
  markersCorrect = [];
  markersGuess = [];
  markers = [];
  userName: string = "";
  constructor() { }

  reset() {
    this.currentPhotoIndex = 0;
    this.markersCorrect = [];
    this.markersGuess = [];
    this.markers = [];
    this.userName = "";
  }
}
