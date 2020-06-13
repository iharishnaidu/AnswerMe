import { Questionnaire } from './questionnaire.model';

export class Options
{
    public optionId : number;
    public questionObj : Questionnaire;
    public optionText : string;
    public isAnswer : boolean;
}