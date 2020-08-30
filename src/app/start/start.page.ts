import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { WaarisdatService } from "../service/waarisdat.service";
import { PhotoMetadata } from '../service/waarisdat.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  // userName: string = "";
  // level: number = 1;
  // startButtonDisabled: boolean = true;

  feedItems = [];
  private coverPhotoMetadataList: Array<PhotoMetadata>;

  constructor(
    public navCtrl: NavController,
    private router: Router,
    private authService: AuthService,
    public waarisdatService: WaarisdatService) {

  }

  ngOnInit() {
    // this.userName = this.waarisdatService.userName;
    // this.level = this.waarisdatService.currentLevel;

    this.waarisdatService.reset();
  }

  ionViewWillEnter() {
    this.feedItems = [];


    this.waarisdatService.getCoverList().then(result => {
      this.coverPhotoMetadataList = result;

      for (var index in this.coverPhotoMetadataList) {
        let photoMetadata = this.coverPhotoMetadataList[index];
        var feedItem = {
          photo: photoMetadata.imgUrl,
          quizName: photoMetadata.quizName,
        };
        this.feedItems.push(feedItem);
      }
    });

  }

  // userNameInput() {
  //   this.startButtonDisabled = false;
  // }

  // levelInput() {
  //   this.waarisdatService.currentLevel = this.level;

  // }

  startButton() {

    // this.waarisdatService.userName = this.userName;
    // this.waarisdatService.currentLevel = this.level;
    // //console.log("startButton " + this.level);
    this.router.navigate(["photo"]);

    // var up = {
    //   email: "rienbouw@gmail.com",
    //   password: "password"
    // }

    // this.authService.doLogin(up)
    // .then(res => {

    // }, err => {

    // console.log(err)
    // })


  }

}
