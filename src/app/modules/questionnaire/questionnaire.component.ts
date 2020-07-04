import { Component, OnInit } from '@angular/core';
import { Questionnaire } from './questionnaire.model';
import { HttpClient } from '@angular/common/http';
import { Options } from './options.model';
import 'rxjs/Rx';
import { map } from "rxjs/operators";
import { Topic } from './topic.model';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {

  constructor(private http : HttpClient) { 
  }

  questionnaireObj: Questionnaire = new Questionnaire();
  topicObj : Topic = new Topic();
  quesIndex: number = 0;
  isEnabledPrev: boolean;
  isEnabledNext: boolean;
  backgroundColor: string;
  progressValue : number;
  apiQuestions : string = "https://answer-me.cfapps.io/questions/all";
  apiTopics : string = "https://answer-me.cfapps.io/topic/";
  //apiQuestions : string = "http://localhost:8080/questions/all";
  questionnaireArr: Questionnaire[] = [];
  noOfQues : number;
  isLastQues : boolean;
  isTopicSelected : boolean;
  isQuizStarted : boolean;
  isStartQuizClicked : boolean;
  marksCounter : number;
  topicsArr: Topic[] = [];
  topicIDSelected : number;

  ngOnInit() {
    this.isLastQues = false;
    this.isEnabledPrev = false;
    this.isEnabledNext = true;
    this.progressValue = 0;
    this.marksCounter = 0;
    this.isTopicSelected = false;
    this.isQuizStarted = false;
    this.isStartQuizClicked = false;
    this.loadTopics();
    //this.loadQuestions();
  }

  loadTopics()
  {
    let apiEndpoint = this.apiTopics.concat("all");
    this.http.get(apiEndpoint).subscribe(res => {
      this.topicsArr = res as Topic[];
    })
  }

  topicClick(topicID : number)
  {
    this.topicIDSelected = topicID;
    this.isTopicSelected = true;
  }

  getQuestionsByTopic()
  {
    this.isQuizStarted = true;
    this.isStartQuizClicked = true;
    let apiEndpoint = this.apiTopics.concat(this.topicIDSelected.toString());
    this.http.get(apiEndpoint).subscribe(res =>
      {
        this.topicObj = res as Topic;
        this.questionnaireArr = this.topicObj.questionsList as Questionnaire[];
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