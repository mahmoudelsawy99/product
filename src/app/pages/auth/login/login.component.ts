import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string='';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
     this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

   get formControls() {
    return this.loginForm.controls;
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(response => {
        if (response && response.token) {
          this.router.navigate(['/products']);
        } else {
          this.loginError = 'Invalid credentials. Please check your email and password.';
        }
      });
    }
  }
}
