import { TestBed } from '@angular/core/testing';
import { Login } from '../models/login';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let user: Login;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginService);
    user = {
      username: 'user1',
      password: 'pass1'
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should logged in for valid user', (done: DoneFn) => {
    service.login(user).subscribe(value => {
      expect(value).toBe(true);
      done();
    });
  });

  it('should not be able log in for invalid user', (done: DoneFn) => {
    user = {
      username: 'invaliduser',
      password: 'pass1'
    };

    service.login(user).subscribe(value => {
      expect(value).toBe(false);
      done();
    });
  });

  it('should return user logged in status ', (done: DoneFn) => {
    service.login(user).subscribe(value => {
      expect(service.isUserLoggedIn).toBe(true);
      done();
    });
  });

  it('should return false if user is not logged in', () => {
    expect(service.isUserLoggedIn).toBe(false);
  });

  it('should set user logged in status', () => {
    expect(service.isUserLoggedIn).toBe(false);
    service.setUserLoginState = true;
    expect(service.isUserLoggedIn).toBe(true);
  });

});
