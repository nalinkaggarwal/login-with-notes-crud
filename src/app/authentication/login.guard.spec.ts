import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Login } from '../models/login';
import { LoginService } from '../services/login.service';
import { LoginGuard } from './login.guard';

describe('Login.Guard', () => {
  const routerMock = { navigate: jasmine.createSpy('navigate') };
  let service: LoginService;
  let loginGuard: LoginGuard;
  let user: Login;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginGuard,
        { provide: Router, useValue: routerMock }
      ]
    });
    service = TestBed.inject(LoginService);
    loginGuard = TestBed.inject(LoginGuard);
    user = {
      username: 'test1',
      password: 'test1'
    };
  });

  it('should create an instance', () => {
    expect(loginGuard).toBeTruthy();
  });

  it('should allow user to navigate', (done: DoneFn) => {
    service.login(user).subscribe(value => {
      expect(loginGuard.canActivate()).toEqual(true);
      done();
    });
  });

  it('should not allow user to navigate', () => {
    expect(loginGuard.canActivate()).toEqual(false);
  });

});
