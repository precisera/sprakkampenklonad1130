import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
	Generated class for the GlobalsProvider provider.

	See https://angular.io/guide/dependency-injection for more info on providers
	and Angular DI.
*/
@Injectable()
export class GlobalsProvider {
	quesNum: any = 0;
	questions: Array<string> = [];
	numOfCorrectQues: number = 0;
	totalTimeTaken: number = 0;
	totalNumOfQues: number = 0;
	maxPossibleMarksToGet: number = 0;

	savedQuesNum: any = 0;
	savedQuestions: Array<string> = [];
	savedQuestionsKeys: Array<string> = [];
	numOfCorrectSavedQuestions: number = 0;
	totalTimeTakenSavedQues: number = 0;
	totalNumOfSavedQues: number = 0;
	maxPossibleMarksSavedToGet: number = 0;

	anonymousLoggedIn: boolean = false;
	anonymousUid: string = '';

	numOfWrongQues: number = 0;

	marks: number = 0;

	constructor(public http: Http) {
		console.log('Hello GlobalsProvider Provider');
	}

	clear() {
		this.quesNum = undefined;
		this.numOfCorrectQues = undefined;
		this.numOfCorrectSavedQuestions = undefined;
		this.questions = undefined;
		this.savedQuestions = undefined;
		this.anonymousLoggedIn = undefined;
		this.anonymousUid = undefined;
		this.marks = undefined;
		this.numOfWrongQues = undefined;
	}

}
