import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WaarisdatService {
  currentPhotoIndex: number = 0;
  markersCorrect = [];
  markersGuess = [];
  markers = [];
  constructor() { }
}
