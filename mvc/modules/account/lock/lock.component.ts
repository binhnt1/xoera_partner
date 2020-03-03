import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { MvcAuthService } from "../../../../mvc/services/auth.service";
import { ResultType } from "../../../../mvc/domains/enums/result.type";
import { LoginDto, AccountDto } from "../../../../mvc/domains/objects/account.dto";

@Component({
    styleUrls: ['./lock.scss'],
    selector: 'mvc-account-lock',
    templateUrl: './lock.component.html',
})
export class AccountLockComponent implements OnInit {
    item: LoginDto;
    message: string;
    processing: boolean;
    account: AccountDto;

    constructor(
        public router: Router,
        public authen: MvcAuthService) {
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
