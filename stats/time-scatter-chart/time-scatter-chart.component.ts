import {Component, Input, OnChanges, ViewChild} from '@angular/core';
import {BaseChartDirective} from 'ng2-charts';
import {ChartData, ChartOptions} from 'chart.js';

export interface TimeByQuestionPoint {
  position: number;
  averageTime: number;
  standardDeviation: number;
  times: number[];
  studentNames?: string[];
}

@Component({
  selector: 'app-time-scatter-chart',
  templateUrl: './time-scatter-chart.component.html',
  standalone: false,
})
export class TimeScatterChartComponent implements OnChanges {
  @Input() data: TimeByQuestionPoint[] = [];

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  readonly chartLegend = true;

  chartData: ChartData<'scatter'> = {
    datasets: [
      {label: 'Temps de réponse par question', data: [], pointRadius: 5},
      {label: 'Moyenne', data: [], pointRadius: 6, pointStyle: 'triangle'},
      {label: 'Valeur aberrante', data: [], pointRadius: 5},
    ],
  };

  readonly chartOptions: ChartOptions<'scatter'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx: any) => {
            const name = ctx.raw.studentName ?? '';
            return name ? `${name} — ${ctx.raw.x}s` : `${ctx.raw.x}s`;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {stepSize: 1},
        beginAtZero: true,
        title: {
          display: true,
          text: 'Index des questions',
          color: 'black',
          font: {family: 'Arial', size: 14, weight: 'bold'},
        },
      },
    },
  };

  ngOnChanges(): void {
    this.chartData.datasets[0].data = [];
    this.chartData.datasets[1].data = [];
    this.chartData.datasets[2].data = [];

    for (const d of this.data) {
      (d.times ?? []).forEach((t, i) => {
        const studentName = d.studentNames?.[i] ?? '';
        const point = {x: t, y: d.position + 1, studentName} as any;
        if (Math.abs(d.averageTime - t) < d.standardDeviation) {
          this.chartData.datasets[0].data.push(point);
        } else {
          this.chartData.datasets[2].data.push(point);
        }
      });
      this.chartData.datasets[1].data.push({x: d.averageTime, y: d.position + 1} as any);
    }

    this.chart?.update();
  }
}
