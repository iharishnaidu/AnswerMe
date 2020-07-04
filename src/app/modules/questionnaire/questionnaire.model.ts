import { Options } from './options.model';

export class Questionnaire
{
    public questionID : number;
    public questionText : string;
    public options : Options[];
}