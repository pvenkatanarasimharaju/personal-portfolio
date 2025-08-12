import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { map } from 'rxjs/operators';

import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  private theme = inject(ThemeService);
  isDarkMode$ = this.theme.theme$.pipe(map((theme: string) => theme === 'dark'));
}
