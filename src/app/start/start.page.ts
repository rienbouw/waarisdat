import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  constructor(public navCtrl: NavController, private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  startButton() {

    var up = {
      email: "rienbouw@gmail.com",
      password: "adka12"
    }

    // this.authService.doLogin(up)
    //   .then(res => {
    //     this.router.navigate(["/home"]);
    //   }, err => {

    //     console.log(err)
    //   })


    this.router.navigate(['photo']);
  }
}
