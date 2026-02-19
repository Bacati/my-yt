import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AppStateService } from '../../services/state';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl : './register.html'
})
export class RegisterComponent {
  private fb = inject(NonNullableFormBuilder);
  private authService = inject(AppStateService);
  private router = inject(Router);

  errorMessage = '';

  registerForm = this.fb.group({
    pseudo: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.registerForm.valid) {
      if (this.authService.register(this.registerForm.getRawValue())) {
        this.router.navigate(['/login']);
      } else {
        this.errorMessage = 'Ce pseudo ou cet email est déjà utilisé.';
      }
    }
  }
}