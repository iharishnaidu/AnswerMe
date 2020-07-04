import { Questionnaire } from './questionnaire.model';

export class Topic
{
    public TopicID : number;
    public TopicName : string;
    public questionsList : Questionnaire[];
}