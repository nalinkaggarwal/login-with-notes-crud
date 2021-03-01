import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from '../services/login.service';
@Injectable()
export class LoginGuard implements CanActivate {
  constructor(public auth: LoginService, public router: Router) {}
  canActivate(): boolean {
    //console.log(this.auth.isUserLoggedIn);
    if (!this.auth.isUserLoggedIn) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}