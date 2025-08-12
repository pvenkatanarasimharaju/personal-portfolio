import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';

import { Chart, ChartConfiguration, ChartData, Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { Subscription } from 'rxjs';

import { ThemeService } from '../../core/theme.service';

Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './skills.component.html',
})
export class SkillsComponent implements OnInit, OnDestroy {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  skills: Array<{ subject: string; value: number }> = [
    { subject: 'Angular', value: 90 },
    { subject: 'TypeScript', value: 85 },
    { subject: 'Bootstrap', value: 80 },
    { subject: 'HTML5', value: 90 },
    { subject: 'CSS3', value: 80 },
    { subject: 'REST APIs', value: 75 },
  ];

  tags: string[] = [
    'Angular',
    'TypeScript',
    'Bootstrap',
    'HTML5',
    'CSS3',
    'JavaScript',
    'REST APIs',
    '.NET Integration',
  ];

  radarChartLabels: string[] = this.skills.map((skill) => skill.subject);

  radarChartData: ChartData<'radar'> = {
    labels: this.radarChartLabels,
    datasets: [
      {
        label: 'Proficiency',
        data: this.skills.map((s) => s.value),
        fill: true,
        backgroundColor: 'rgba(33,37,41,0.2)',
        borderColor: '#212529',
        pointBackgroundColor: '#212529',
        pointBorderColor: '#ffffff',
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: '#212529',
      },
    ],
  };

  radarChartOptions: ChartConfiguration<'radar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: { display: false, stepSize: 20 },
        pointLabels: { color: '#6c757d', font: { size: 12 } },
        grid: { color: 'rgba(0,0,0,0.06)' },
        angleLines: { color: 'rgba(0,0,0,0.08)' },
      },
    },
    elements: { line: { borderWidth: 2 } },
  };

  private theme = inject(ThemeService);
  private themeSubscription?: Subscription;

  ngOnInit(): void {
    this.themeSubscription = this.theme.theme$.subscribe((theme) => this.applyTheme(theme));
  }

  ngOnDestroy(): void {
    this.themeSubscription?.unsubscribe();
  }

  private applyTheme(theme: string): void {
    const isDark = theme === 'dark';

    // Update dataset colors
    const dataset = this.radarChartData.datasets[0];
    dataset.borderColor = isDark ? '#f8f9fa' : '#212529';
    dataset.backgroundColor = isDark ? 'rgba(248,249,250,0.2)' : 'rgba(33,37,41,0.2)';
    dataset.pointBackgroundColor = isDark ? '#f8f9fa' : '#212529';
    dataset.pointBorderColor = isDark ? '#212529' : '#ffffff';
    dataset.pointHoverBackgroundColor = isDark ? '#212529' : '#ffffff';
    dataset.pointHoverBorderColor = isDark ? '#f8f9fa' : '#212529';

    // Update scale colors on live chart instance if available; fallback to options object
    const chartInstance = this.chart?.chart;
    const targetOptions = chartInstance?.options ?? (this.radarChartOptions as any);
    const rScale = (targetOptions.scales as any)?.['r'];
    if (rScale) {
      rScale.pointLabels = { color: isDark ? '#ced4da' : '#495057', font: { size: 12 } };
      rScale.grid = { color: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)' };
      rScale.angleLines = { color: isDark ? 'rgba(255,255,255,0.20)' : 'rgba(0,0,0,0.16)' };
    }

    // Trigger chart update if created
    if (chartInstance) {
      this.chart?.update();
    }
  }
}
