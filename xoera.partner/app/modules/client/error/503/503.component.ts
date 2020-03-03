import { Router } from "@angular/router";
import { Component } from "@angular/core";

@Component({
    styleUrls: ['../error.scss'],
    templateUrl: './503.component.html',
})
export class Error503Component {
  constructor(public router: Router) {
       
  }
}
