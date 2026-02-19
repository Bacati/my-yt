import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AppStateService } from '../../services/state';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AppStateService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};