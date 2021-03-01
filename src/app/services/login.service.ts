import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLogin = false;
  constructor() { }

  login(userLogin: Login): Observable<boolean>{
    this.setUserLoginState = true;
    return of(this.isLogin);
  }

  get isUserLoggedIn(): boolean{
    return this.isLogin;
  }

  set setUserLoginState(state: boolean) {
    this.isLogin = state;
  }
}
