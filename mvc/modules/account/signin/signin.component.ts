import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { RouterHelper } from "../../../helpers/router.helper";
import { MvcAuthService } from "../../../services/auth.service";
import { LoginDto } from "../../../../mvc/domains/objects/account.dto";
import { ResultType } from "../../../../mvc/domains/enums/result.type";

@Component({
  selector: 'mvc-account-signin',
  templateUrl: './signin.component.html'
})
export class AccountSignInComponent {
  item: LoginDto;
  message: string;
  processing: boolean;

  constructor(
    public router: Router,
    public authen: MvcAuthService) {
    this.item = new LoginDto();
  }

  public async login() {
    this.closeMessage();
    if (this.item && this.item.Account && this.item.Password) {
      this.processing = true;
      let result = await this.authen.login(this.item);
      if (result.Type != ResultType.Success)
        this.message = result.Description;
    } else this.message = 'Enter username and password.';
    this.processing = false;
  }

  public closeMessage() {
    this.message = '';
  }

  public navigateForgotPassword() {
    RouterHelper.Navigate(this.router, '/admin/forgot');
  }
}
