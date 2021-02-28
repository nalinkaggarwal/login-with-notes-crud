import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLogin: boolean = false;
  constructor() { }

  login(userLogin: Login) {
    this.setUserLoginState = true;
    return of(this.isLogin);
  }

  get isUserLoggedIn() {
    return this.isLogin;
  }

  set setUserLoginState(state: boolean) {
    this.isLogin = state;
  }
}
