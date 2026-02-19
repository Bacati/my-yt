import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AppStateService } from '../../services/state';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside 
      class="fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white overflow-y-auto transition-all duration-300 z-40"
      [class.w-64]="state.isSidebarOpen()"
      [class.w-16]="!state.isSidebarOpen()">
      
      <div class="flex flex-col py-2">
        
        <a routerLink="/" routerLinkActive="bg-gray-100 font-bold" [routerLinkActiveOptions]="{exact: true}" 
           class="flex items-center px-4 py-3 hover:bg-gray-100 rounded-lg mx-2 cursor-pointer">
          @if (state.isSidebarOpen()) { <span class="ml-4 truncate">Accueil</span> }
        </a>

        @if (state.isLoggedIn()) {
          <hr class="my-3 border-gray-200">
          
          @if (state.isSidebarOpen()) {
            <h3 class="px-6 text-sm font-semibold text-gray-500 mb-2">Vos Playlists</h3>
          }
          
          @for (playlist of state.playlists(); track playlist.id) {
            <a [routerLink]="['/playlist', playlist.id]" 
               class="flex items-center px-4 py-3 hover:bg-gray-100 rounded-lg mx-2 cursor-pointer">
              <span class="text-xl">Playlist</span>
              @if (state.isSidebarOpen()) { <span class="ml-4 truncate">{{ playlist.name }}</span> }
            </a>
          } @empty {
            @if (state.isSidebarOpen()) {
              <p class="px-6 text-sm text-gray-400 italic">Aucune playlist.</p>
            }
          }
        }
      </div>
    </aside>
  `
})
export class SidebarComponent {
  state = inject(AppStateService);
}