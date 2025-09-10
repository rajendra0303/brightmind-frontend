import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { User, LoginRequest, RegisterRequest, AuthResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private apiService: ApiService) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        this.currentUserSubject.next(JSON.parse(userStr));
      }
    }
  }

  private setStorageItem(key: string, value: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, value);
    }
  }

  private removeStorageItem(key: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(key);
    }
  }

  private getStorageItem(key: string): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(key);
    }
    return null;
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('/auth/login', credentials)
      .pipe(
        tap(response => {
          this.setStorageItem('token', response.token);
          this.setStorageItem('refreshToken', response.refreshToken);
          this.setStorageItem('user', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
        })
      );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('/auth/register', userData)
      .pipe(
        tap(response => {
          this.setStorageItem('token', response.token);
          this.setStorageItem('refreshToken', response.refreshToken);
          this.setStorageItem('user', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
        })
      );
  }

  logout(): void {
    this.removeStorageItem('token');
    this.removeStorageItem('refreshToken');
    this.removeStorageItem('user');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.getStorageItem('token');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.getStorageItem('refreshToken');
    return this.apiService.post<AuthResponse>('/auth/refresh', { refreshToken })
      .pipe(
        tap(response => {
          this.setStorageItem('token', response.token);
          this.setStorageItem('refreshToken', response.refreshToken);
          this.setStorageItem('user', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
        })
      );
  }
}