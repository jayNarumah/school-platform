import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    isLoggedIn = false;

    constructor(
        private readonly authService: AuthService,
        private readonly router: Router
    ) {
        this.isLoggedIn = this.authService.isLoggedIn;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        if (!this.isLoggedIn) {
            return this.router.navigate(['/auth/login']);
        }

        return true;
    }
}
