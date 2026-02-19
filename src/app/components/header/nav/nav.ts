import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppStateService } from '../../../services/state';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.html'
})
export class NavbarComponent {
  state = inject(AppStateService);
}