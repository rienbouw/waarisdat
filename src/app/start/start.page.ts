import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { WaarisdatService } from "../service/waarisdat.service";

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  userName: string = "";
  startButtonDisabled: boolean = true;

  constructor(
    public navCtrl: NavController,
    private router: Router,
    private authService: AuthService,
    public waarisdatService: WaarisdatService) {

  }

  ngOnInit() {
  }

  userNameInput() {
    this.startButtonDisabled = false;
  }

  startButton() {

    var up = {
      email: "rienbouw@gmail.com",
      password: "adka12"
    }

    this.authService.doLogin(up)
      .then(res => {
        this.waarisdatService.reset();
        this.waarisdatService.userName = this.userName;
        this.router.navigate(["photo"]);
      }, err => {

        console.log(err)
      })


  }

}
