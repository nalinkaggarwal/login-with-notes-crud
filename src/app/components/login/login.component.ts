import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../models/login';
import { LoginService } from '../../services/login.service';
import { noWhitespaceValidator } from '../../helpers/whitespace.validator';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  userLoginForm!: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
    this.userLoginForm = this.formBuilder.group({
      username: [null, Validators.required, noWhitespaceValidator],
      password: [null, Validators.required]
    });
  }

  get userLoginFormControl(): { [key: string]: AbstractControl } {
    return this.userLoginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.userLoginForm.valid) {
      const user: Login = { username: this.userLoginFormControl['username'].value, password: this.userLoginFormControl['password'].value };
      this.loginService.login(user).subscribe(() => {
        this.router.navigate(['/notes']);
      });
    }
  }
}
