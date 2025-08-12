import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule, PdfViewerModule],
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent {

}
