import { Injectable } from '@angular/core';
import { MvcAuthService } from '../services/auth.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: MvcAuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const account = this.authService.account;
        if (account) {
            if (account.Locked) {
                this.router.navigate(['/admin/lock'], { queryParams: { returnUrl: state.url } });
                return false;
            }
            return true;
        }
        let url = state.url.indexOf('/lock') >= 0 ? '/admin' : state.url;
        this.router.navigate(['/admin/signin'], { queryParams: { returnUrl: url } });
        return false;
    }
}