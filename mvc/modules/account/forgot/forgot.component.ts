import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { RouterHelper } from "../../../helpers/router.helper";

@Component({
    selector: 'mvc-account-forgot',
    templateUrl: './forgot.component.html',
})
export class AccountForgotComponent {
    email: string;
    message: string;
    processing: boolean;

    constructor(public router: Router) {
    }

    public navigateSignIn() {
        RouterHelper.Navigate(this.router, '/admin/signin');
    }

  public async submit() {
    this.closeMessage();
    if (this.email) {
      this.processing = true;
    } else this.message = 'Enter your email to reset your password!';
    this.processing = false;
  }

  public closeMessage() {
    this.message = '';
  }
}
