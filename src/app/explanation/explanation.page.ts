import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explanation',
  templateUrl: './explanation.page.html',
  styleUrls: ['./explanation.page.scss'],
})
export class ExplanationPage implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  closeButton() {
    this.router.navigate(['start']);
  }
}
