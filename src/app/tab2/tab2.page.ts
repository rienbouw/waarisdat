import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  sliderOne: any;

  constructor(
    public navCtrl: NavController,
    private router: Router
    ) {

      this.sliderOne =
      {
        isBeginningSlide: true,
        isEndSlide: false,
        slidesItems: [
          {
            id: 1
          },
          {
            id: 2
          },
          {
            id: 3
          },
          {
            id: 4
          },
          {
            id: 5
          }
        ]
      };
  }

  onPhotoClick(params: any) {
    //alert("Photo click: " + params);
    this.router.navigate(['/tabs/tab1'])
  }
}
