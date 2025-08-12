import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { map } from 'rxjs/operators';

import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  router = inject(Router);
  private theme = inject(ThemeService);
  isDarkMode$ = this.theme.theme$.pipe(map((theme: string) => theme === 'dark'));

  ngOnInit(): void { }

  toggleDarkMode(): void {
    this.theme.toggleTheme();
  }
}
