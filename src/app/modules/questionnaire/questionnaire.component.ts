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
  quesIndex: number = 0;
  isEnabledPrev: boolean;
  isEnabledNext: boolean;
  backgroundColor: string;
  progressValue : number;
  //apiQuestions : string = "https://answer-me.cfapps.io/questions/all";
  apiQuestions : string = "http://localhost:8080/questions/all";
  questionnaireArr: Questionnaire[] = [];
  noOfQues : number;
  isLastQues : boolean;
  marksCounter : number;

  ngOnInit() {
    this.isLastQues = false;
    this.isEnabledPrev = false;
    this.isEnabledNext = true;
    this.progressValue = 0;
    this.marksCounter = 0;
    this.loadQuestions();
  }

  loadQuestions() {
    console.log("Inside Load Questions");
    //subscribe to observable returned from Question API endpoint
    this.http.get(this.apiQuestions).subscribe(res => {
      this.questionnaireArr = res as Questionnaire[];
      console.log(this.questionnaireArr);
      this.noOfQues = this.questionnaireArr.length;
      console.log(this.quesIndex);
      this.questionnaireArr.forEach(ques => {
        this.questionnaireObj = ques as Questionnaire;
        this.questionnaireObj = this.questionnaireArr[this.quesIndex];
        console.log(this.questionnaireObj);
      });
    });
  }

  goPrev() {
    if (this.quesIndex > 0) {
      this.quesIndex = this.quesIndex - 1;
      this.questionnaireObj = this.questionnaireArr[this.quesIndex];
    }
    this.progressValue = this.progressValue - (100/this.noOfQues);
    this.disabled();
  }

  goNext() {
    if (this.quesIndex < this.questionnaireArr.length + 1) {
      this.quesIndex = this.quesIndex + 1;
      this.questionnaireObj = this.questionnaireArr[this.quesIndex];
    }
    this.progressValue = this.progressValue + (100/this.noOfQues);
    this.disabled();
  }

  disabled() {
    if (this.quesIndex <= 0) {
      this.isEnabledPrev = false;
      this.isEnabledNext = true;
      this.isLastQues = false;
    }

    else if (this.quesIndex == this.questionnaireArr.length) {
      this.isLastQues = true;
      this.isEnabledNext = false;
      this.isEnabledPrev = true;
    }

    else {
      this.isEnabledPrev = true;
      this.isEnabledNext = true;
      this.isLastQues = false;
    }
  }

  checkAnswer(questionID : number, optionID: number, index : number)
  {
    console.log("Question ID : " + questionID);
    console.log("Option ID :" + optionID);
    console.log("Index : " +index);
    if(this.questionnaireObj.options[index].answer == true)
    {
      console.log("Correct answer");
      this.marksCounter += 1;
      //this.backgroundColor = "green";
    }
    else
    {
      console.log("Wrong answer");
      //this.backgroundColor = "red";
    }
  }
}