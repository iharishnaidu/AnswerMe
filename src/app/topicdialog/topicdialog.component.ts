import { Component, OnInit } from '@angular/core';
import { Topic } from '../modules/questionnaire/topic.model';
import { QuestionnaireserviceService } from '../shared/services/questionnaireservice.service';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-topicdialog',
  templateUrl: './topicdialog.component.html',
  styleUrls: ['./topicdialog.component.css']
})
export class TopicdialogComponent implements OnInit {

  constructor(private http: HttpClient, private questionnaireservice : QuestionnaireserviceService, private dialogRef: MatDialogRef<TopicdialogComponent>) { }

  topicsArr: Topic[] = [];
  topicIDSelected: number;
  isTopicSelected: boolean;

  ngOnInit() {
    this.isTopicSelected = false;
    this.loadTopics();
  }

  loadTopics() {
    this.questionnaireservice.getTopics().then(res => {
     this.topicsArr = res as Topic[];
     console.log(this.topicsArr);
    });
   }

   topicClick(topicID : number)
   {
    this.topicIDSelected = topicID;
    this.isTopicSelected = true;
    this.dialogRef.close(this.topicIDSelected);
   }
}
