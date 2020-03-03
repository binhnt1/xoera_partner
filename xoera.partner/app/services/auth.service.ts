import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { RouterHelper } from '../../../mvc/helpers/router.helper';
import { ResultApi } from '../../../mvc/domains/data/result.api';
import { ResultType } from '../../../mvc/domains/enums/result.type';
import { UserDto, LoginDto } from '../domains/objects/user.dto';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private accountSubject: BehaviorSubject<UserDto>;

    constructor(
        private router: Router,
        private service: ApiService) {
        this.accountSubject = new BehaviorSubject<UserDto>(JSON.parse(localStorage.getItem('xoera.partner.account')));
    }

    public get account(): UserDto {
        return this.accountSubject.value;
    }

    public async login(dto: LoginDto): Promise<ResultApi> {
        let account: UserDto;
        const result = await this.service.signin(dto);
        if (result && result.Type == ResultType.Success) {
            account = (<UserDto>result.Object);
            if (account && account.Token) {
                account.Locked = false;
                this.accountSubject.next(account);
                localStorage.setItem('xoera.partner.account', JSON.stringify(account));

                // Redirect
                let queryParams = this.router.parseUrl(this.router.url).queryParams,
                    url = queryParams && queryParams['returnUrl'];
                if (url)
                    RouterHelper.Navigate(this.router, url, null, true);
                else
                    RouterHelper.Navigate(this.router, '/', null, true);
            }
        }
        if (result && result.Type == ResultType.Exception) {
            return result;
        }
        if (result && result.Type == ResultType.Fail && result.Object) {
            account = <UserDto>result.Object;
            if (!account.IsActive) {
                this.navigateVerify(dto);
                return result;
            }
            if (!account.Approved) {
                this.navigateApproved(dto);
                return result;
            }
        }
        return result;
    }

    public navigateVerify(account: LoginDto) {
        RouterHelper.NavigateState(this.router, '/vertify', {
            account: account.Account,
            password: account.Password
        });
    }

    public navigateApproved(account: LoginDto) {
        RouterHelper.NavigateState(this.router, '/approved', {
            account: account.Account,
            password: account.Password
        });
    }

    public lock() {
        this.account.Locked = true;
        let url = this.router.routerState.snapshot.url;
        localStorage.setItem('xoera.partner.account', JSON.stringify(this.account));
        RouterHelper.Navigate(this.router, '/lock?returnUrl=' + url, null, true);
    }

    public logout() {
        this.accountSubject.next(null);
        let queryParams = this.router.parseUrl(this.router.url).queryParams,
            url = queryParams && queryParams['returnUrl'];
        if (!url) url = this.router.routerState.snapshot.url;
        if (url == '/lock') url = '/';
        localStorage.removeItem('xoera.partner.account');
        RouterHelper.Navigate(this.router, '/signin?returnUrl=' + url, null, true);
    }
}