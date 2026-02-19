import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { Router, RouterLink } from '@angular/router';
import { AppStateService } from '../../services/state';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html'
})
export class LoginComponent {
  private fb = inject(NonNullableFormBuilder); 
  private authService = inject(AppStateService);
  private router = inject(Router);

  errorMessage = '';

  loginForm = this.fb.group({
    pseudo: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      if (this.authService.login(this.loginForm.getRawValue())) {
        this.router.navigate(['/']); 
      } else {
        this.errorMessage = 'Pseudo ou mot de passe incorrect.';
      }
    }
  }
}