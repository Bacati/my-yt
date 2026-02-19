import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/header/nav/nav';
import { SidebarComponent } from './components/sidebar/sidebar';
import { AppStateService } from './services/state';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidebarComponent],
  template: `
    <div class="min-h-screen bg-gray-50 flex flex-col">
      <app-navbar></app-navbar>

      <div class="flex flex-1 pt-16">
        
        <app-sidebar></app-sidebar>

        <main 
          class="flex-1 p-6 transition-all duration-300"
          [class.ml-64]="state.isSidebarOpen()"
          [class.ml-16]="!state.isSidebarOpen()">
          
          <router-outlet></router-outlet>
          
        </main>
      </div>
    </div>
  `
})
export class AppComponent {
  state = inject(AppStateService);
}