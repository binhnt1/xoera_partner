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
import { RegisterDto, RegisterVertifyDto } from "../../../domains/objects/user.dto";

@Component({
    styleUrls: ['./signup.scss'],
    templateUrl: './signup.component.html',
})
export class SignUpComponent implements OnInit {
    active: boolean;
    message: string;
    user: RegisterDto;
    processing: boolean;
    timeCountDown: number = 0;
    translateIndex: number = 0;

    constructor(
        public router: Router,
        public auth: AuthService,
        public data: DataService,
        public service: ApiService,
        public event: MvcEventService) {
        this.user = new RegisterDto();
    }

    public signup() {

    }

    public navigateSignIn() {
        RouterHelper.Navigate(this.router, '/signin');
    }

    ngOnInit() {
        this.user = new RegisterDto();
        this.user.UserName = 'binhnt1';
        this.user.SurName = 'Bình';
        this.user.FirstName = 'Ngô';
        this.user.AgreeTerms = true;
        this.user.Phone = '+84986847586';
        this.user.Password = '123456';
        this.user.ConfirmPassword = '123456';
        this.user.Email = 'binhnt1@gmail.com';
        this.user.CompanyName = 'Xoera';
        this.user.ContactPerson = 'BinhNT';
        this.user.ContactPhone = '+84986847586';
        this.user.ContactEmail = 'binhnt1@gmail.com';
        this.user.CompanyAddress = 'London, England';
    }

    async processNext() {
        this.closeMessage();
        this.processing = true;
        let columns: string[] = [];
        if (this.translateIndex == 0) columns = ['UserName', 'FirstName', 'SurName', 'Phone', 'Email', 'Password', 'ConfirmPassword', 'AgreeTerms'];
        else if (this.translateIndex == 1) columns = ['CompanyName', 'CompanyAddress', 'ContactPerson', 'ContactEmail', 'ContactPhone', 'AgreeTerms'];
        else if (this.translateIndex == 2) columns = ['VertifyCode'];
        let valid = await validation(this.user, this.event, this.service, columns);
        if (valid) {
            if (this.translateIndex == 0) {
                this.processing = false;
                this.translateIndex += 1;
                let $preset = $('#sectionContent'),
                    translateX = -this.translateIndex * 390;
                $preset.css({
                    transform: 'translateX(' + translateX + 'px)'
                });
            } else if (this.translateIndex == 1) {
                this.service.register(this.user).then((result: ResultApi) => {
                    this.processing = false;
                    if (result.Type == ResultType.Success) {
                        this.translateIndex += 1;
                        let $preset = $('#sectionContent'),
                            translateX = -this.translateIndex * 390;
                        $preset.css({
                            transform: 'translateX(' + translateX + 'px)'
                        });
                        this.enableTimeCountDown();
                    } else this.message = result.Description;
                });
            } else if (this.translateIndex == 2) {
                let objDto: RegisterVertifyDto = {
                    VertifyCode: this.user.VertifyCode,
                    Account: this.user.UserName || this.user.Email || this.user.Phone
                }
                this.service.registerVertify(objDto).then(async (result: ResultApi) => {
                    if (result.Type == ResultType.Success) {
                        await this.auth.login({
                            Account: this.user.UserName,
                            Password: this.user.Password,
                        });
                    } else this.message = result.Description;
                    this.processing = false;
                });
            }
        } else this.processing = false;
    }

    processPrev() {
        if (this.translateIndex > 0) {
            this.translateIndex -= 1;
            let $preset = $('#sectionContent'),
                translateX = -this.translateIndex * 390;
            $preset.css({
                transform: 'translateX(' + translateX + 'px)'
            });
        }
    }

    sendVertifyCode() {
        if (this.timeCountDown <= 0) {
            this.processing = true;
            let objDto: RegisterVertifyDto = {
                VertifyCode: this.user.VertifyCode,
                Account: this.user.UserName || this.user.Email || this.user.Phone,
            }
            this.service.registerSendEmail(objDto).then((result: ResultApi) => {
                this.processing = false;
                if (result.Type == ResultType.Success) {
                    this.enableTimeCountDown();
                } else this.message = result.Description;
            });
        }
    }

    closeMessage() {
        this.message = '';
    }

    enableTimeCountDown() {
        this.timeCountDown = 60;
        let interval = setInterval(() => {
            this.timeCountDown -= 1;
            if (this.timeCountDown <= 0)
                clearInterval(interval);
        }, 1000)
    }
}
