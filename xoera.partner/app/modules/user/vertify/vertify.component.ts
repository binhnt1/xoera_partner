import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { DataService } from "../../../services/data.service";
import { AuthService } from "../../../services/auth.service";
import { validation } from "../../../../../mvc/interceptor/validation";
import { RouterHelper } from "../../../../../mvc/helpers/router.helper";
import { ResultApi } from "../../../../../mvc/domains/data/result.api";
import { MvcEventService } from "../../../../../mvc/services/event.service";
import { ResultType } from "../../../../../mvc/domains/enums/result.type";
import { RegisterVertifyDto, LoginDto } from "../../../domains/objects/user.dto";

@Component({
    styleUrls: ['./vertify.scss'],
    templateUrl: './vertify.component.html',
})
export class VertifyComponent implements OnInit {
    message: string;
    processing: boolean;
    userLogin: LoginDto;
    user: RegisterVertifyDto;
    timeCountDown: number = 0;

    constructor(
        public router: Router,
        public data: DataService,
        public auth: AuthService,
        public service: ApiService,
        public event: MvcEventService) {
        this.user = new RegisterVertifyDto();
        let account = RouterHelper.getUrlState(this.router, 'account'),
            password = RouterHelper.getUrlState(this.router, 'password');
        this.userLogin = {
            Account: account,
            Password: password
        };
        this.user.Account = account;
    }

    ngOnInit() {
    }

    async vertify() {
        this.closeMessage();
        this.processing = true;
        let columns: string[] = ['VertifyCode'];
        let valid = await validation(this.user, this.event, this.service, columns);
        if (valid) {
            this.service.registerVertify(this.user).then(async (result: ResultApi) => {
                if (result.Type == ResultType.Success) {
                    let result = await this.auth.login(this.userLogin);
                    if (result.Type != ResultType.Success) {
                        this.message = result.Description;
                    }
                } else this.message = result.Description;
                this.processing = false;
            });
        } else this.processing = false;
    }

    sendVertifyCode() {
        if (this.timeCountDown <= 0) {
            this.processing = true;
            this.service.registerSendEmail(this.user).then((result: ResultApi) => {
                this.processing = false;
                if (result.Type == ResultType.Success) {
                    this.enableTimeCountDown();
                } else this.message = result.Description;
            });
        }
    }

    enableTimeCountDown() {
        this.timeCountDown = 60;
        let interval = setInterval(() => {
            this.timeCountDown -= 1;
            if (this.timeCountDown <= 0)
                clearInterval(interval);
        }, 1000)
    }

    public navigateSignIn() {
        RouterHelper.Navigate(this.router, '/signin');
    }

    public closeMessage() {
        this.message = '';
    }
}
