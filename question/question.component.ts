import {Component, Input, OnInit} from '@angular/core';
import {SelectOption} from "../little-input/select.option";
import {Question} from "../../services/question/question";
import {QuestionStoreService} from "../../services/question/question-store.service";
import {Response} from "../../services/question/Response";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit{
  @Input() id = 0;
  @Input() edit: boolean = false;

  @Input() question: Question = {
    index: 0,
    image: null,
    points: 0,
    statement: "",
    timer: 0,
    type: "",
    singleResponse: true,
    multiplechoices: [],
    questionnaireId: ''
  }

  questionType: SelectOption[] = [{
    id: 'short',
    value: 'short'
  }, {
    id: 'long',
    value: 'long'
  }, {
    id: 'multiplechoice',
    value: 'Choix multiple'
  }];
  multipleChoice: boolean = false;
  responses: Response[] = [];
  private countChoice: number = 0;

  constructor(
    private readonly questionService: QuestionStoreService
  ) {
  }

  getPts(pts: number) {
    this.question.points = pts;
    this.questionService.editQuestion(this.id, this.question)
  }

  getStatement(statement: string) {
    this.question.statement = statement
    this.questionService.editQuestion(this.id, this.question)
  }

  getType(type: string) {
    if(typeof type == "string"){
      this.question.type = type
      this.questionService.editQuestion(this.id, this.question)
    }
  }

  getTimer(timer: string) {
    if(typeof timer == "string") {
      this.question.timer = +timer
      this.questionService.editQuestion(this.id, this.question)
    }
  }

  isMultipleChoice(isMultipleChoice: boolean) {
    if(typeof isMultipleChoice == "boolean") {
      this.multipleChoice = isMultipleChoice
      this.question.singleResponse = !isMultipleChoice
      this.questionService.editQuestion(this.id, this.question)
    }
  }

  addAnswer($event: boolean) {
    this.question.multiplechoices.push({
      content: "",
      image: null,
      isCorrect: false
    })
  }

  setResponse(content: string, i: number) {
    if(typeof content == 'string'){
      this.question.multiplechoices[i].content = content;
      this.questionService.editQuestion(this.id, this.question)
    }

  }

  isCorrect(isCorrect: boolean, i: number) {
    if(typeof isCorrect == 'boolean') {
      isCorrect ? this.countChoice += 1 : this.countChoice -= 1;

      if (this.countChoice > 1){
        this.multipleChoice = true
        this.question.singleResponse = false;
      }else{
        this.multipleChoice = false;
        this.question.singleResponse = true;
      }

      this.question.multiplechoices[i].isCorrect = isCorrect;
      this.questionService.editQuestion(this.id, this.question)
    }
  }

  ngOnInit(): void {
    this.question.questionnaireId = history.state.questionnaireId;
    this.question.index = this.id;
    this.questionService.editQuestion(this.id, this.question)
  }
}
