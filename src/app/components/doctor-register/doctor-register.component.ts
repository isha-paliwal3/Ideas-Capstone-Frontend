import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { validateEmail } from '../../validators/email-validator';
import { validatePassword } from '../../validators/password-validator';

@Component({
  selector: 'app-doctor-register',
  templateUrl: './doctor-register.component.html',
  styleUrls: ['./doctor-register.component.css']
})
export class DoctorRegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router
  ) {
    this.registerForm
 = this.fb.group({
      email: ['', [Validators.required, Validators.email, validateEmail()]],
      password: ['', [Validators.required, Validators.minLength(8), validatePassword()]]
    });
  }

  onSubmit(): void {
    if (this.registerForm
.valid) {
      const email = this.registerForm
.get('email')?.value;
      const password = this.registerForm
.get('password')?.value;

      this.authService.login(email, password)
      this.registerForm
.reset();
    }
  }
}

