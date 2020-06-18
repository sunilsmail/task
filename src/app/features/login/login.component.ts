import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  invalidUser = false;
  constructor(public fb: FormBuilder, public loginService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  submit(formValues) {
    debugger
    this.loginService.login(formValues.username, formValues.password).subscribe((user) => {
      if (user) {
        this.router.navigate(['dashboard']);
        this.invalidUser = false;
      } else {
        this.invalidUser = true;
      }
    })
  }

  getErrorEmail(controlname) {
    return this.loginForm.get(controlname).hasError('required')
      ? 'Field is required'
      : this.loginForm.get(controlname).hasError('minlength')
        ? 'minimum length 3'
        : this.loginForm.get(controlname).hasError('maxlength')
          ? 'max length is 20'
          : '';
  }
}
