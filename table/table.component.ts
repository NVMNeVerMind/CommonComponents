import {Component, Input} from '@angular/core';


export interface ITable {
  content: string[];
  click?: {
    condition?: boolean;
    content: string;
    alt: string;
    isImg: boolean;
    fn: (...args: any) => void;
  }[];
}

@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() heads: string[] = [];
  @Input() rows: ITable[] = [];
}
