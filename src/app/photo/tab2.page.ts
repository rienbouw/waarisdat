import { Component, ViewChild, ElementRef } from '@angular/core';
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
export class PhotoPage {
  @ViewChild(IonSlides) slides: IonSlides;
  @ViewChild('slideWithNav', { read: ElementRef }) slider: ElementRef;

  slideOptsOne = {
    zoom: {
      maxRatio: 5
    }
  };
  public sliderOne: any;
  currentPhotoIndex;
  klaarButtonText = "KLAAR! Laat mij de score zien.";
  photoNumber = 1;
  firstView: boolean;
  private photoMetadataList: Observable<PhotoMetadata[]>;

  // slideChanged = ev => {
  //   console.log(ev);
  //   this.photoNumber = ev.realIndex + 1
  // };

  constructor(
    public navCtrl: NavController,
    private router: Router,
    public waarisdatService: WaarisdatService
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


    this.firstView = true;
  }

  ngOnInit() {
    console.log("ngOnInit photo"); //enable the log, and this page will be initialized each time it is navigated to!!!!!
    this.getPhotos();
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
    this.router.navigate(['map'])

  }

  ionViewWillEnter() {
    if (this.firstView) {
      console.log("firstView");
      this.firstView = false;
    } else {
      if (this.waarisdatService.currentPhotoIndex == this.sliderOne.slidesItems.length - 1) {
        this.slides.slideTo(0);
      } else {
        this.slides.slideNext();
      }
    }
    this.slideChanged();
  }

  getPhotos() {
    this.photoMetadataList = this.waarisdatService.getPhotoMetadataList();
    console.log("getPhotos(): " + this.photoMetadataList);
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
    });
  }


  klaarButton() {
    this.router.navigate(['finish'])
  }
}
