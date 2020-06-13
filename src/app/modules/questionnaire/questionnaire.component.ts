import { Component, OnInit } from '@angular/core';
import { Questionnaire } from './questionnaire.model';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {

  constructor() { }

  questionnaireObj : Questionnaire;
  arrIndex : number = 0;
  isEnabledPrev : boolean;
  isEnabledNext : boolean;

  questionnaireArr: Questionnaire[] = [{ questionId: 1, questionText: "Question 1", options: ["Option 1", "Option2", "Option3"] },
  { questionId: 2, questionText: "Question 2", options: ["Option 1", "Option2", "Option3"] },
  { questionId: 3, questionText: "Question 3", options: ["Option 1", "Option2", "Option3"] }];

  ngOnInit() {
    this.questionnaireObj = this.questionnaireArr[this.arrIndex];
    console.log(this.questionnaireObj);
    this.isEnabledPrev = false;
    this.isEnabledNext = true;
  }

  goPrev()
  {
    this.arrIndex = this.arrIndex - 1;
    if(this.arrIndex >= 0)
    {
      this.questionnaireObj = this.questionnaireArr[this.arrIndex];
      if(this.arrIndex == 0)
      {
        this.isEnabledPrev = false;
        this.isEnabledNext = true;
      }
    }
    else
    {
      this.isEnabledPrev = false;
      this.isEnabledNext = true;
    }
    
  }

  goNext()
  {
    this.arrIndex = this.arrIndex + 1;
    if(this.arrIndex < this.questionnaireArr.length)
    {
      this.questionnaireObj = this.questionnaireArr[this.arrIndex];
      if(this.arrIndex == this.questionnaireArr.length - 1)
      {
        this.isEnabledNext = false;
        this.isEnabledPrev = true;
      }
    }
    else
    {
      this.isEnabledNext = false;
      this.isEnabledPrev = true;
    }
  }
}
