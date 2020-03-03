import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MvcApiService } from './api.service';
import { MvcDataService } from './data.service';
import { AppConfig } from '../helpers/app.config';
import { RouterHelper } from '../helpers/router.helper';
import { ResultApi } from '../../mvc/domains/data/result.api';
import { ResultType } from '../../mvc/domains/enums/result.type';
import { AccountDto, LoginDto } from '../../mvc/domains/objects/account.dto';

@Injectable({ providedIn: 'root' })
export class MvcAuthService {
    private accountSubject: BehaviorSubject<AccountDto>;

    constructor(
        private router: Router,
        private data: MvcDataService,
        private service: MvcApiService) {
        this.accountSubject = new BehaviorSubject<AccountDto>(JSON.parse(localStorage.getItem('account')));
    }

    public get account(): AccountDto {
        return this.accountSubject.value;
    }

    public async login(dto: LoginDto): Promise<ResultApi> {
        let account: AccountDto;
        const result = await this.service.login(dto);
        if (result && result.Type == ResultType.Success) {
            account = (<AccountDto>result.Object);
            if (account && account.Token) {
                account.Locked = false;
                this.accountSubject.next(account);
                localStorage.setItem('account', JSON.stringify(account));

                // Redirect
                let queryParams = this.router.parseUrl(this.router.url).queryParams,
                    url = queryParams && queryParams['returnUrl'];
                if (url)
                    RouterHelper.Navigate(this.router, url, null, true);
                else
                    RouterHelper.Navigate(this.router, '/admin', null, true);
            }
        }
        return result;
    }

    public lock() {
        this.account.Locked = true;
        let url = this.router.routerState.snapshot.url;
        localStorage.setItem('account', JSON.stringify(this.account));
        RouterHelper.Navigate(this.router, '/admin/lock?returnUrl=' + url, null, true);
    }

    public logout() {
        this.accountSubject.next(null);
        localStorage.removeItem('account');
        let queryParams = this.router.parseUrl(this.router.url).queryParams,
            url = queryParams && queryParams['returnUrl'];
        if (!url) url = this.router.routerState.snapshot.url;
        if (url == '/lock') url = '/';
        RouterHelper.Navigate(this.router, '/admin/signin?returnUrl=' + url, null, true);
    }
}