import { Component, OnInit, wtfStartTimeRange } from '@angular/core';
import { Questionnaire } from './questionnaire.model';
import { HttpClient } from '@angular/common/http';
import { Options } from './options.model';
import 'rxjs/Rx';
import { map } from "rxjs/operators";
import { Topic } from './topic.model';
import { timer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) {
  }

  questionnaireObj: Questionnaire = new Questionnaire();
  topicObj: Topic = new Topic();
  questionnaireArr: Questionnaire[] = [];
  topicsArr: Topic[] = [];
  selectedAnswerByQuesId = new Map();

  quesIndex: number = 0;
  backgroundColor: string;
  progressValue: number;
  noOfQues: number;
  marksCounter: number;
  topicIDSelected: number;

  isEnabledPrev: boolean;
  isEnabledNext: boolean;
  isLastQues: boolean;
  isTopicSelected: boolean;
  isQuizStarted: boolean;
  isStartQuizClicked: boolean;
  isEvaluated: boolean;


  apiQuestions: string = "https://answer-me.cfapps.io/questions/all";
  apiTopics: string = "https://answer-me.cfapps.io/topic/";
  //apiQuestions : string = "http://localhost:8080/questions/all";

  ngOnInit() {
    this.isLastQues = false;
    this.isEnabledPrev = false;
    this.isEnabledNext = true;
    this.progressValue = 0;
    this.marksCounter = 0;
    this.isTopicSelected = false;
    this.isQuizStarted = false;
    this.isStartQuizClicked = false;
    this.isEvaluated = false;
    this.selectedAnswerByQuesId = new Map();
    this.loadTopics();
  }

  loadTopics() {
    let apiEndpoint = this.apiTopics.concat("all");
    this.http.get(apiEndpoint).subscribe(res => {
      this.topicsArr = res as Topic[];
    })
  }

  topicClick(topicID: number) {
    this.topicIDSelected = topicID;
    this.isTopicSelected = true;
  }

  getQuestionsByTopic() {
    this.isQuizStarted = true;
    this.isStartQuizClicked = true;
    let apiEndpoint = this.apiTopics.concat(this.topicIDSelected.toString());
    this.http.get(apiEndpoint).subscribe(res => {
      this.topicObj = res as Topic;
      this.questionnaireArr = this.topicObj.questionsList as Questionnaire[];
      this.noOfQues = this.questionnaireArr.length;
      console.log(this.questionnaireArr);
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
    this.progressValue = this.progressValue - (100 / this.noOfQues);
    this.disabled();
  }

  goNext() {
    console.log(this.questionnaireArr);
    if (this.quesIndex < this.questionnaireArr.length + 1) {
      this.quesIndex = this.quesIndex + 1;
      this.questionnaireObj = this.questionnaireArr[this.quesIndex];
    }
    this.progressValue = this.progressValue + (100 / this.noOfQues);
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

  submitAnswer(questionID: number, optionID: number, index: number) {
    console.log("Question ID : " + questionID);
    console.log("Option ID :" + optionID);
    console.log("Index : " + index);
    this.selectedAnswerByQuesId.set(questionID, this.questionnaireObj.options[index].optionID);
    console.log(this.selectedAnswerByQuesId);
  }

  evaluateQuiz() {
    console.log(this.questionnaireArr);
    for (let [key, value] of this.selectedAnswerByQuesId) {
      console.log([key, value]);
      for (var j = 0; j < this.questionnaireArr.length; j++) {
        console.log(this.questionnaireArr[j].questionID);
        if (this.questionnaireArr[j].questionID.toString() == key) {
          this.questionnaireArr[j].options.forEach(option => {
            if (option.optionID == value && option.answer == true) {
              console.log("Correct answer");
              this.marksCounter += 1;
            }
          })
        }
      }
    }
    this.isEvaluated = true;
  }

  redirectToQuizHomepage()
  {
    this.router.navigate(["/questionnaire"]);
  }
}