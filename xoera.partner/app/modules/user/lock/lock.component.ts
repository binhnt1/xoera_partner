import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { ResultType } from "../../../../../mvc/domains/enums/result.type";
import { UserDto, LoginDto } from "../../../domains/objects/user.dto";

@Component({
    styleUrls: ['./lock.scss'],
    templateUrl: './lock.component.html',
})
export class LockComponent implements OnInit {
    item: LoginDto;
    message: string;
    account: UserDto;
    processing: boolean;

    constructor(
        public router: Router,
        public authen: AuthService) {
        this.item = new LoginDto();
    }

    ngOnInit() {
        if (this.authen.account) {
            this.account = this.authen.account;
            this.item = {
                Password: '',
                Account: this.account.UserName || this.account.Email || this.account.Phone,
            }
        } else this.authen.logout();
    }

    public navigateSignIn() {
        this.authen.logout();
    }

    public async login() {
        this.closeMessage();
        if (this.item && this.item.Account && this.item.Password) {
            this.processing = true;
            let result = await this.authen.login(this.item);
            if (result.Type != ResultType.Success)
                this.message = result.Description;
        } else this.message = 'Enter password to unlock.';
        this.processing = false;
    }

    public closeMessage() {
        this.message = '';
    }
}
