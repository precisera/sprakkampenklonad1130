import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import * as firebase from 'firebase';

/*
  Generated class for the FireDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FireDataProvider {

	constructor(public http: Http) {
		console.log('Hello FireDataProvider Provider');
	}

	getAllQuestions() {
		return new Promise((resolve, reject) => {
			var dbRef = firebase.database().ref('/questions');
			dbRef.orderByChild('Category 1').equalTo('Synonym').on('child_added', (data) => {
				console.log('QUESTIONS', data.val());
			})
			/*dbRef.once('value', (data) => {
				console.log('QUESTIONS', data.val());
			});*/
		});		
	}



}
