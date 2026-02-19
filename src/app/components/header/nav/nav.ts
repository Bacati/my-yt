import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppStateService } from '../../../services/state';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="fixed top-0 w-full bg-white h-16 flex items-center justify-between px-4 shadow-sm z-50">
      
      <div class="flex items-center gap-4">
        <button (click)="state.toggleSidebar()" class="p-2 hover:bg-gray-100 rounded-full">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
        <a routerLink="/" class="text-xl font-bold text-red-600 flex items-center gap-1">
          MyYoutube
        </a>
      </div>

      <div class="flex-1 max-w-2xl px-4 flex">
        <input 
          type="text" 
          placeholder="Rechercher..." 
          class="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500"
          #searchInput
          (keyup.enter)="state.updateSearch(searchInput.value)"
        >
        <button 
          (click)="state.updateSearch(searchInput.value)"
          class="px-6 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200">
          Rechercher
        </button>
      </div>

      <div class="flex items-center gap-4">
        @if (state.isLoggedIn()) {
          <button routerLink="/profil" class="font-medium text-gray-700 hover:text-blue-600">
            {{ state.currentUser()?.username || 'Mon Profil' }}
          </button>
          <button (click)="state.logout()" class="text-sm px-4 py-2 text-red-600 hover:bg-red-50 rounded-full">
            Déconnexion
          </button>
        } @else {
          <a routerLink="/login" class="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Se connecter
          </a>
        }
      </div>
    </nav>
  `
})
export class NavbarComponent {
  // On injecte le state pour l'utiliser directement dans le template
  state = inject(AppStateService);
}