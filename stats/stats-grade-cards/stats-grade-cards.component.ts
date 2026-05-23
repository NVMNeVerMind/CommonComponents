import {Component, Input} from '@angular/core';

export interface GradeStatsInput {
  averageGrade: number;
  medianGrade: number;
  minGrade: number;
  maxGrade: number;
  standardDeviation: number;
  passRate: number;
  totalStudents: number;
}

@Component({
  selector: 'app-stats-grade-cards',
  templateUrl: './stats-grade-cards.component.html',
  standalone: false,
})
export class StatsGradeCardsComponent {
  @Input() grades!: GradeStatsInput;

  format(n: number): string {
    return n?.toFixed(2) ?? '—';
  }
}
