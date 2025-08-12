import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly themeSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this.detectInitialTheme());
  readonly theme$: Observable<string> = this.themeSubject.asObservable();

  constructor() {
    // Apply the initial theme on startup
    this.applySideEffects(this.themeSubject.value);
  }

  toggleTheme(): void {
    const nextTheme = this.themeSubject.value === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme);
  }

  setTheme(theme: string): void {
    this.themeSubject.next(theme);
    this.applySideEffects(theme);
  }

  private applySideEffects(theme: string): void {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }

  private detectInitialTheme(): string {
    const saved = localStorage.getItem('theme');
    return saved ?? 'light';
  }
}


