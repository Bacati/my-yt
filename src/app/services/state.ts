import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthToken, Playlist, User } from '../models/youtube';


@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private router = inject(Router);

  currentUser = signal<AuthToken | null>(JSON.parse(localStorage.getItem('myyoutube_token') || 'null'));
  isSidebarOpen = signal<boolean>(true);
  searchQuery = signal<string>('');
  playlists = signal<Playlist[]>(JSON.parse(localStorage.getItem('myyoutube_playlists') || '[]'));
  isLoggedIn = computed(() => this.currentUser() !== null);
  
  register(user: User): boolean {
    const users: User[] = JSON.parse(localStorage.getItem('myyoutube_users') || '[]');
    
    if (users.find((u) => u.pseudo === user.pseudo || u.email === user.email)) {
      return false;
    }
    
    users.push(user);
    localStorage.setItem('myyoutube_users', JSON.stringify(users));
    return true;
  }

  login(credentials: Pick<User, 'pseudo' | 'password'>): boolean {
    const users: User[] = JSON.parse(localStorage.getItem('myyoutube_users') || '[]');
    const user = users.find((u) => 
      u.pseudo === credentials.pseudo && u.password === credentials.password
    );

    if (user) {
      const fakeToken: AuthToken = { pseudo: user.pseudo, email: user.email };
      localStorage.setItem('myyoutube_token', JSON.stringify(fakeToken));
      this.currentUser.set(fakeToken);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('myyoutube_token');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  toggleSidebar(): void {
    this.isSidebarOpen.update(v => !v);
  }
}