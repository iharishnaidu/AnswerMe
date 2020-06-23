import { Component, OnInit } from '@angular/core';
import { Questionnaire } from './questionnaire.model';
import { HttpClient } from '@angular/common/http';
import { Options } from './options.model';
import 'rxjs/Rx';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {

  constructor(private http : HttpClient) { 
  }

  questionnaireObj: Questionnaire;
  arrIndex: number = 0;
  isEnabledPrev: boolean;
  isEnabledNext: boolean;
  backgroundColor: string;
  progressValue : number;
  apiQuestions : string = "https://localhost:44376/api/tbl_Questions";
  apiOptions : string = "https://localhost:44376/api/tbl_Options/Gettbl_OptionsByQuestionId/";

  questionnaireArr: Questionnaire[] = [];
  optionsforQuesIdArr : Options[];
  myvar : any;

  ngOnInit() {
    //this.questionnaireObj = this.questionnaireArr[this.arrIndex];
    //console.log(this.questionnaireObj);
    this.isEnabledPrev = false;
    this.isEnabledNext = true;
    this.progressValue = 33.33;
    this.loadQuestions();
    //this.loadOptionsForQuestion(this.questionnaireArr);
  }

  loadQuestions() {
    console.log("Inside Load Questions");
    //subscribe to observable returned from Question API endpoint
    this.http.get(this.apiQuestions).subscribe(res => 
      {
        this.questionnaireArr = res as Questionnaire[];
        console.log(this.questionnaireArr);

        this.questionnaireArr.forEach(ques => {
          this.questionnaireObj = ques as Questionnaire;
          console.log(this.questionnaireObj);
          console.log(this.questionnaireObj.QuestionID);
          this.apiOptions = this.apiOptions.concat(ques.QuestionID.toString());
          //subscribe to observable returned from Option API endpoint
          this.http.get(this.apiOptions).subscribe(response => {
            this.optionsforQuesIdArr = response as Options[];
            console.log(this.optionsforQuesIdArr);
          });
        });
      });
  }

  goPrev() {
    if (this.arrIndex > 0) {
      this.arrIndex = this.arrIndex - 1;
      this.questionnaireObj = this.questionnaireArr[this.arrIndex];
    }
    this.progressValue = this.progressValue - 33.33;
    this.disabled();
  }

  goNext() {
    if (this.arrIndex < this.questionnaireArr.length - 1) {
      this.arrIndex = this.arrIndex + 1;
      this.questionnaireObj = this.questionnaireArr[this.arrIndex];
    }
    this.progressValue = this.progressValue + 33.33;
    this.disabled();
  }

  disabled() {
    if (this.arrIndex <= 0) {
      this.isEnabledPrev = false;
      this.isEnabledNext = true;
    }

    else if (this.arrIndex == this.questionnaireArr.length - 1) {
      this.isEnabledNext = false;
      this.isEnabledPrev = true;
    }

    else {
      this.isEnabledPrev = true;
      this.isEnabledNext = true;
    }
  }

  checkAnswer(questionID : number, index : number)
  {
    // if(this.questionnaireArr[questionID].correctAnswer == index)
    // {
    //   console.log("Right answer");
    //   this.questionnaireArr[questionID]
    // }
    // else
    // {
    //   console.log("Wrong answer");
    //   this.backgroundColor = "warn";
    // }
  }
}