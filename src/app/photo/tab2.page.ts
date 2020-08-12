import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { WaarisdatService } from "../service/waarisdat.service";
import { IonSlides } from '@ionic/angular';
import { ZoomControlStyle } from '@agm/core';
import { PhotoMetadata } from '../service/waarisdat.service';
import { Observable } from 'rxjs';
//import { } from '@types/googlemaps';

declare var google;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class PhotoPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  @ViewChild('slideWithNav', { read: ElementRef }) slider: ElementRef;

  slideOptsOne = {
    zoom: {
      maxRatio: 5
    }
  };
  public sliderOne: any;
  currentPhotoIndex;
  //klaarButtonText = "KLAAR! Laat mij de score zien.";
  photoNumber = 1;
  level: number;

  private photoMetadataList: Array<PhotoMetadata>;

  // slideChanged = ev => {
  //   console.log(ev);
  //   this.photoNumber = ev.realIndex + 1
  // };

  constructor(
    public navCtrl: NavController,
    private router: Router,
    public waarisdatService: WaarisdatService
  ) {
  }

  ngOnInit() {
    this.sliderOne =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: []
    };
  }


  onPhotoClick() {

    this.slider.nativeElement.getActiveIndex().then(index => {
      this.waarisdatService.currentPhotoIndex = index;
    });
    //this.slides.lockSwipeToNext(true);
    //this.waarisdatService.currentPhotoIndex = params;
    //console.log("onPhotoClick: currentPhotoIndex " + this.waarisdatService.currentPhotoIndex); //enable this line and ngOninit is called on map page!!!!!!!!!!!!
    let zoom = this.slider.nativeElement.swiper.zoom;
    zoom.out();
    this.router.navigate(["map", { back: "photo" }]);
  }

  ionViewWillEnter() {
    this.sliderOne =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: []
    };
    this.level = this.waarisdatService.currentLevel;
    //console.log("ngOnInit photo " + this.level); 

    //    this.photoMetadataList = this.waarisdatService.getPhotoMetadataList();
    this.waarisdatService.getPhotoMetadataListOfCurrentLevel().then(result => {
      if (result != null) {
        this.photoMetadataList = result;
        this.waarisdatService.currentNumberOfPhotos = this.photoMetadataList.length;
        console.log("Aantal foto's voor niveau " + this.waarisdatService.currentLevel + " : " + this.photoMetadataList.length);
        for (var index in this.photoMetadataList) {
          var pmd = this.photoMetadataList[index];
          this.sliderOne.slidesItems.push({ id: 1, imgUrl: pmd.imgUrl });
        }

        if (this.waarisdatService.initializeQuiz) {
          console.log("photo - initializeQuiz");
          this.slides.slideTo(0);
          this.photoNumber = 1;
          this.waarisdatService.currentPhotoIndex = 0;
          this.waarisdatService.initializeQuiz = false;
        } else {

          if (this.photoMetadataList == null || this.waarisdatService.currentPhotoIndex + 1 == this.photoMetadataList.length) {
            console.log("ionViewWillEnter slide 0");
            this.slides.slideTo(0);
          } else {
            this.slides.slideTo(this.waarisdatService.currentPhotoIndex + 1);
            this.slides.getActiveIndex().then(index => {
              console.log("ionViewWillEnter slide moved to " + (index + 1));
              console.log(this.waarisdatService.currentPhotoIndex);
            });
          }

          this.slideChanged();
        }
      }
    });
  }

  get_CurrentPhotoIndex() {
    return this.currentPhotoIndex;
  }

  // SlideDidChange(ev) {

  //   this.currentPhotoIndex = this.slides.getActiveIndex();
  //   //this.photoNumber = this.slides.getActiveIndex() + 1;
  //   console.log("SlideDidChanged " + this.currentPhotoIndex);
  // }


  slideChanged() {
    this.slides.getActiveIndex().then(index => {
      this.waarisdatService.currentPhotoIndex = index;
      this.photoNumber = index + 1;
      console.log("slideChanged to " + this.photoNumber);
    });
  }


  klaarButton() {
    this.router.navigate(['finish'])
  }
}
