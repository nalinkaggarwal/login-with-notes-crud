import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [LoginComponent],
      providers: [
        { provide: Router, useValue: { navigate: () => { } } },
        { provide: LoginService, useClass: MockService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loginService = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form using formbuilder', () => {
    expect(component.userLoginForm instanceof FormGroup).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.userLoginForm.valid).toBeFalsy();
  });

  it('username field validity', () => {
    const username = component.userLoginForm.controls['username'];
    expect(username.valid).toBeFalsy();
  });

  it('username field error validity', () => {
    let errors = {};
    const username = component.userLoginForm.controls['username'];
    errors = username.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('username field whitespace error validity', () => {
    let errors = {};
    const username = component.userLoginForm.controls['username'];
    username.setValue('    ');
    errors = username.errors || {};
    expect(errors['whitespace']).toBeTruthy();
  });

  it('password field validity', () => {
    const password = component.userLoginForm.controls['password'];
    expect(password.valid).toBeFalsy();
  });

  it('password error field validity', () => {
    let errors = {};
    const password = component.userLoginForm.controls['password'];
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('should return all controls', () => {
    expect(component.userLoginFormControl).toBeTruthy();
  });

  it('should return true for valid user data', () => {
    expect(component.userLoginForm.valid).toBeFalsy();
    component.userLoginForm.controls['username'].setValue('tes1');
    component.userLoginForm.controls['password'].setValue('123456789');
    expect(component.userLoginForm.valid).toBe(true);
  });

  it('for valid data, user should login', () => {
    spyOn(loginService, 'login')
      .and
      .callThrough();
    spyOn(router, 'navigate').and.callThrough();
    expect(component.userLoginForm.valid).toBeFalsy();
    component.userLoginForm.controls['username'].setValue('user1');
    component.userLoginForm.controls['password'].setValue('pass1');
    expect(component.userLoginForm.valid).toBe(true);
    component.onSubmit();
    fixture.detectChanges();
    expect(loginService.login).toHaveBeenCalledWith(component.userLoginForm.value);
    expect(router.navigate).toHaveBeenCalledWith(['/notes']);
  });

  it('for invalid data, user should login', () => {
    spyOn(loginService, 'login')
      .and
      .callThrough();
    spyOn(router, 'navigate').and.callThrough();
    expect(component.userLoginForm.valid).toBeFalsy();
    component.userLoginForm.controls['username'].setValue('tes1');
    component.userLoginForm.controls['password'].setValue('test1');
    expect(component.userLoginForm.valid).toBe(true);
    component.onSubmit();
    fixture.detectChanges();
    expect(loginService.login).toHaveBeenCalledWith(component.userLoginForm.value);
    expect(router.navigate).not.toHaveBeenCalled();
  });


  it('for invalid form data, user should not login', () => {
    spyOn(loginService, 'login')
      .and
      .callThrough();
    spyOn(router, 'navigate').and.callThrough();
    expect(component.userLoginForm.valid).toBeFalsy();
    component.userLoginForm.controls['username'].setValue(' ');
    component.userLoginForm.controls['password'].setValue('123456789');
    expect(component.userLoginForm.valid).toBe(false);
    component.onSubmit();
    fixture.detectChanges();

    let usernameErrors = {};
    const username = component.userLoginForm.controls['username'];
    username.setValue('    ');
    usernameErrors = username.errors || {};
    expect(usernameErrors['whitespace']).toBeTruthy();

  });

});

class MockService {
  isLogin = true;
  login(user: Login): Observable<boolean> {
    if (user.username === "user1")
      return of(true);
    return of(false);
  }
}
