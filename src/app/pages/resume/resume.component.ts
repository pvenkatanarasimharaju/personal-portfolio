import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { map } from 'rxjs/operators';

import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule, PdfViewerModule],
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent {
  private theme = inject(ThemeService);
  isDarkMode$ = this.theme.theme$.pipe(map((theme: string) => theme === 'dark'));
}
