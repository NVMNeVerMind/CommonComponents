import {Component, Input, OnInit} from '@angular/core';
import {Matched} from "../../../services/question/matched";

@Component({
  selector: 'app-corrected-matched',
  templateUrl: './corrected-matched.component.html',
  styleUrl: './corrected-matched.component.scss'
})
export class CorrectedMatchedComponent implements OnInit {
  @Input() matched: Matched[] = [];
  @Input() response: string = '';
  protected answerMatched: Map<string, { id: string, content: string }> = new Map<string, { id: string, content: string }>();

  ngOnInit(): void {
    if (this.response.trim() != '') {
      const associations = this.response.split(',')
      associations.forEach(association => {
        const [firstId, secondId] = association.split('.')
        const matchIndex = this.matched.findIndex(match => match.firstId == firstId)
        if (matchIndex != -1)
          this.answerMatched.set(firstId, { id: secondId, content: this.matched[matchIndex].secondContent });
      })
    }
    console.log(this.matched);
    console.log(this.answerMatched);
  }

  isCorrect(matched: Matched): boolean {
    if (this.answerMatched.has(matched.firstId!))
      return this.answerMatched.get(matched.firstId!)?.id == matched.secondId;
    return false;
  }
}
