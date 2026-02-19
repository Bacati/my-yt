import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  currentUser = signal<any | null>(JSON.parse(localStorage.getItem('myyoutube_user') || 'null'));
  isSidebarOpen = signal<boolean>(true);
  searchQuery = signal<string>('');
  playlists = signal<any[]>(JSON.parse(localStorage.getItem('myyoutube_playlists') || '[]'));
  isLoggedIn = computed(() => this.currentUser() !== null);

  toggleSidebar() {
    this.isSidebarOpen.update(state => !state);
  }

  updateSearch(query: string) {
    this.searchQuery.set(query);
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('myyoutube_user');
  }
}