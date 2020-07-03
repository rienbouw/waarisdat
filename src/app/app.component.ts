import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public afAuth: AngularFireAuth) {
    this.initializeApp();
  }

  initializeApp() {


    this.platform.ready().then(() => {
      this.afAuth.user.subscribe(user => {
        //console.log("subscribe " + user);
        //this.router.navigate(["/start"]);

      }, err => {
        console.log("subscribe error");
      }, () => {
        this.splashScreen.hide();
      })
      this.statusBar.styleDefault();
    });

  }
}


