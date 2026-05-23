import {Component, Input, OnChanges} from '@angular/core';
import {ChartData, ChartOptions} from 'chart.js';

export interface DistributionBucket {
  count: number;
  studentCount: number;
}

export interface DistributionOutlier {
  studentId: string;
  studentName: string;
  count: number;
}

@Component({
  selector: 'app-stats-distribution-card',
  templateUrl: './stats-distribution-card.component.html',
  standalone: false,
})
export class StatsDistributionCardComponent implements OnChanges {
  @Input() title: string = '';
  @Input() distribution: DistributionBucket[] = [];
  @Input() outliers: DistributionOutlier[] = [];
  @Input() barColor: string = '#39918C';
  /** Singular unit label, e.g. "sortie" or "ban" */
  @Input() unit: string = '';
  /** Color class for outlier count, e.g. "text-amber-600" or "text-red-600" */
  @Input() outlierColorClass: string = 'text-gray-700';

  chartData: ChartData<'bar'> = {labels: [], datasets: []};

  readonly chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {legend: {display: false}},
    scales: {y: {beginAtZero: true, ticks: {stepSize: 1}}},
  };

  ngOnChanges(): void {
    const filtered = this.distribution.filter(b => b.count > 0);
    this.chartData = {
      labels: filtered.map(b => `${b.count} ${this.unit}${b.count > 1 ? 's' : ''}`),
      datasets: [{
        data: filtered.map(b => b.studentCount),
        backgroundColor: this.barColor,
        borderRadius: 4,
      }],
    };
  }

  get hasData(): boolean {
    return this.distribution.some(b => b.count > 0);
  }
}
