import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { DataService } from "../../../services/data.service";
import { AuthService } from "../../../services/auth.service";
import { RouterHelper } from "../../../../../mvc/helpers/router.helper";
import { MvcEventService } from "../../../../../mvc/services/event.service";
import { ResultType } from "../../../../../mvc/domains/enums/result.type";
import { LoginDto, UserDto } from "../../../domains/objects/user.dto";

@Component({
  styleUrls: ['./signin.scss'],
  templateUrl: './signin.component.html',
})
export class SignInComponent implements OnInit {
  user: LoginDto;
  message: string;
  processing: boolean;

  constructor(
    public router: Router,
    public data: DataService,
    public auth: AuthService,
    public service: ApiService,
    public event: MvcEventService) {
    this.user = new LoginDto();
  }

  ngOnInit() {
    this.user = new LoginDto();
    this.user.Account = 'binhnt1';
    this.user.Password = '123456';
  }

  public async login() {
    this.closeMessage();
    if (this.user && this.user.Account && this.user.Password) {
      this.processing = true;
      let result = await this.auth.login(this.user);
      if (result && result.Type != ResultType.Success) {
        this.message = result.Description;
      }
    } else this.message = 'Enter username and password.';
    this.processing = false;
  }

  public navigateSignUp() {
    RouterHelper.Navigate(this.router, '/signup');
  }

  public navigateForgotPassword() {
    RouterHelper.Navigate(this.router, '/forgot');
  }

  public closeMessage() {
    this.message = '';
  }
}
