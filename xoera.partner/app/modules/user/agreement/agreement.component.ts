import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { DataService } from "../../../services/data.service";
import { AuthService } from "../../../services/auth.service";
import { RouterHelper } from "../../../../../mvc/helpers/router.helper";
import { MvcEventService } from "../../../../../mvc/services/event.service";
import { LoginDto } from "../../../domains/objects/user.dto";

@Component({
    styleUrls: ['./agreement.scss'],
    templateUrl: './agreement.component.html',
})
export class AgreementComponent implements OnInit {
    user: LoginDto;

    constructor(
        public router: Router,
        public data: DataService,
        public auth: AuthService,
        public service: ApiService,
        public event: MvcEventService) {
        this.user = new LoginDto();
        let account = RouterHelper.getUrlState(this.router, 'account'),
            password = RouterHelper.getUrlState(this.router, 'password');
        this.user.Account = account
        this.user.Password = password;
    }

    ngOnInit() {
    }

    public navigateSignIn() {
        RouterHelper.Navigate(this.router, '/signin');
    }
}
