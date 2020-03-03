import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { DataService } from "../../../services/data.service";
import { validation } from "../../../../../mvc/interceptor/validation";
import { RouterHelper } from "../../../../../mvc/helpers/router.helper";
import { MvcEventService } from "../../../../../mvc/services/event.service";
import { ForgotDto } from "../../../domains/objects/user.dto";

@Component({
  styleUrls: ['./forgot.scss'],
  templateUrl: './forgot.component.html',
})
export class ForgotComponent {
  email: string;
  user: ForgotDto;
  message: string;
  processing: boolean;

  constructor(
    public router: Router,
    public data: DataService,
    public service: ApiService,
    public event: MvcEventService) {
      this.user = new ForgotDto();
  }

  public navigateSignIn() {
    RouterHelper.Navigate(this.router, '/signin');
  }

  public async submit() {
    this.closeMessage();
    if (validation(this.user, this.event, this.service)) {
      this.processing = true;
    }
    this.processing = false;
  }

  public closeMessage() {
    this.message = '';
  }
}
