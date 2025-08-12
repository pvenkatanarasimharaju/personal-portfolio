import { Component, inject } from '@angular/core';

import { map } from 'rxjs/operators';

import { ThemeService } from './core/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'personal-portfolio';

  private theme = inject(ThemeService);
  isDarkMode$ = this.theme.theme$.pipe(map((theme: string) => theme === 'dark'));
}
