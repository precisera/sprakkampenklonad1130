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

	anonymousUid: string = '';

	constructor(public http: Http) {
		console.log('Hello GlobalsProvider Provider');
	}

	clear() {
		this.quesNum = undefined;
		this.questions = undefined;
		this.anonymousUid = undefined;
	}

}
