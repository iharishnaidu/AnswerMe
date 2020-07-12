import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Topic } from 'src/app/modules/questionnaire/topic.model';
import { Questionnaire } from 'src/app/modules/questionnaire/questionnaire.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireserviceService {

  apiQuestions: string = "https://answer-me.cfapps.io/questions/all";
  // apiTopics: string = "https://answer-me.cfapps.io/topic/";
  apiTopics: string = "http://localhost:8080/topic/";
  topicsArr: Topic[] = [];
  topicObj : Topic;
  questionnaireArr : Questionnaire[] = [];

  constructor(private http: HttpClient) { }

  async getTopics() : Promise<Topic[]>
  {
    let apiEndpoint = this.apiTopics.concat("all");
    await this.http.get(apiEndpoint).toPromise().then(res => {
      this.topicsArr = res as Topic[];
    });
    return this.topicsArr;
  }

  async getQuestionsByTopicId(topicIDSelected: number) : Promise<Questionnaire[]>
  {
    let apiEndpoint = this.apiTopics.concat(topicIDSelected.toString());
    await this.http.get(apiEndpoint).toPromise().then(res => {
      this.topicObj = res as Topic;
      this.questionnaireArr = this.topicObj.questionsList as Questionnaire[];
    });
    return this.questionnaireArr;
  }
}
