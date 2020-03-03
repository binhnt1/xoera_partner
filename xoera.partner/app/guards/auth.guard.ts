import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class XoeraPartnerAuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const account = this.authService.account;
        if (account) {
            if (account.Locked) {
                this.router.navigate(['/lock'], { queryParams: { returnUrl: state.url } });
                return false;
            }
            return true;
        }
        let url = state.url.indexOf('/lock') >= 0 ? '/' : state.url;
        this.router.navigate(['/signin'], { queryParams: { returnUrl: url } });
        return false;
    }
}