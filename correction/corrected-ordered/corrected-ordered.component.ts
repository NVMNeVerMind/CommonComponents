import {Component, Input, OnInit} from '@angular/core';
import {Ordered} from "../../../services/question/ordered";

@Component({
  selector: 'app-corrected-ordered',
  templateUrl: './corrected-ordered.component.html',
  styleUrl: './corrected-ordered.component.scss'
})
export class CorrectedOrderedComponent implements OnInit{
  @Input() ordered: Ordered[] = []
  @Input() selectedOrder: string = '';
  protected answerOrdered: Ordered[] = [];

  ngOnInit(): void {
    this.ordered.sort((a, b) => a.position - b.position);
    if (this.selectedOrder.length > 0) {
      const selected = this.selectedOrder.split(',');
      this.ordered.forEach((o) => {
        const newOne = Ordered.duplicate(o);
        newOne.position = selected.indexOf(newOne.id!) + 1;
        this.answerOrdered.push(newOne);
      });
      this.answerOrdered.sort((a, b) => a.position - b.position);
    } else {
      this.answerOrdered = this.ordered;
    }
  }

  isCorrect(index: number): boolean {
    return this.ordered[index].id === this.answerOrdered[index].id;
  }
}
