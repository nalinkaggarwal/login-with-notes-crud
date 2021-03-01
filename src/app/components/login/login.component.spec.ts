import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
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
        {provide: Router, useValue: {navigate: () => {}}},
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
    let username = component.userLoginForm.controls['username']; (1)
    expect(username.valid).toBeFalsy(); (2)
  });

  it('username field error validity', () => {
    let errors = {};
    let username = component.userLoginForm.controls['username'];
    errors = username.errors || {};
    expect(errors['required']).toBeTruthy(); (1)
  });

  it('username field whitespace error validity', () => {
    let errors = {};
    let username = component.userLoginForm.controls['username'];
    username.setValue("    ");
    errors = username.errors || {};
    expect(errors['whitespace']).toBeTruthy(); (1)
  });

  it('password field validity', () => {
    let password = component.userLoginForm.controls['password']; (1)
    expect(password.valid).toBeFalsy(); (2)
  });

  it('password error field validity', () => {
    let errors = {};
    let password = component.userLoginForm.controls['password'];
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy(); (1)
  });

  it('should return all controls', () => {
    expect(component.userLoginFormControl).toBeTruthy();
  });

  it('should return true for valid user data', () => {
    expect(component.userLoginForm.valid).toBeFalsy();
    component.userLoginForm.controls['username'].setValue("tes1");
    component.userLoginForm.controls['password'].setValue("123456789");
    expect(component.userLoginForm.valid).toBe(true);
  });

  it('for valid data, user should login', () => {
    spyOn(loginService, 'login')
    .and
    .callThrough();
    spyOn(router, 'navigate').and.callThrough();
    expect(component.userLoginForm.valid).toBeFalsy();
    component.userLoginForm.controls['username'].setValue("tes1");
    component.userLoginForm.controls['password'].setValue("123456789");
    expect(component.userLoginForm.valid).toBe(true);
    component.onSubmit();
    fixture.detectChanges();
    expect(loginService.login).toHaveBeenCalledWith(component.userLoginForm.value);
    expect(router.navigate).toHaveBeenCalledWith(['/notes']);
  });

  it('for invalid data, user should not login', () => {
    spyOn(loginService, 'login')
    .and
    .callThrough();
    spyOn(router, 'navigate').and.callThrough();
    expect(component.userLoginForm.valid).toBeFalsy();
    component.userLoginForm.controls['username'].setValue(" ");
    component.userLoginForm.controls['password'].setValue("123456789");
    expect(component.userLoginForm.valid).toBe(false);
    component.onSubmit();
    fixture.detectChanges();

    let usernameErrors = {};
    let username = component.userLoginForm.controls['username'];
    username.setValue("    ");
    usernameErrors = username.errors || {};
    expect(usernameErrors['whitespace']).toBeTruthy(); (1)

  });

});

class MockService {
  isLogin: boolean = true;
  login(){
    return of(true);
  }
}