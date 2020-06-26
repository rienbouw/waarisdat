import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  constructor(public navCtrl: NavController, private router: Router) { }

  ngOnInit() {
  }

  startButton() {
    this.router.navigate(['photo']);
  }
}
