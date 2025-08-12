import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './skills.component.html',
  styles: [
  ]
})
export class SkillsComponent {
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

  radarChartLabels: string[] = this.skills.map((s) => s.subject);

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
}
