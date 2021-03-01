import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Login } from '../models/login';
import { validUsers } from '../../__mocks__/valid-users';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLogin = false;
  constructor() { }

  login(userLogin: Login): Observable<boolean> { 
    const userFound = validUsers.find(user => (user.username === userLogin.username) && (user.password === userLogin.password));
    
    this.setUserLoginState = userFound ? true : false;
    return of(this.isLogin);
  }

  get isUserLoggedIn(): boolean{
    return this.isLogin;
  }

  set setUserLoginState(state: boolean) {
    this.isLogin = state;
  }
}
