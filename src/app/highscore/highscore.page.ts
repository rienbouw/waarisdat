import { Component, OnInit } from '@angular/core';
import { WaarisdatService } from "../service/waarisdat.service";
import { UserScore } from '../service/waarisdat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.page.html',
  styleUrls: ['./highscore.page.scss'],
})
export class HighscorePage implements OnInit {
  public highScores: Array<UserScore> = new Array();
  constructor(
    public waarisdatService: WaarisdatService,
    private router: Router
  ) { }

  ngOnInit() {
    this.waarisdatService.getHighScore().then(
      res => {
        for (var index in res) {
          var userScore: UserScore = res[index];
          this.highScores.push(userScore);
        }
        //   res.forEach(function (doc: UserScore) {
        //     let formatted_date = doc.date.toString(); //.getDay + "-" + (doc.date.getMonth() + 1) + "-" + doc.date.getFullYear()
        //     this.highScores.push(doc); <========= not accessable in the function !!! 
        //   });
        // }
      })
  }

  restartButton() {
    this.router.navigate(['start']);
  }
}
