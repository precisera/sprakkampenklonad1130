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
			var dbRef = firebase.database().ref('questions');
			dbRef.orderByChild('Category 1').equalTo('Synonym').on('value', (data) => {
				console.log('QUESTIONS', data.val());
			})
			/*dbRef.once('value', (data) => {
				console.log('QUESTIONS', data.val());
			});*/
		});		
	}

	getCategories() {
		return new Promise((resolve, reject) => {
			var quesCategories = [];
			var dbRef = firebase.database().ref('quesCategories');
			dbRef.on('value', (data) => {
				for (var i in data.val()) {
					quesCategories.push(data.val()[i]);
				}

				resolve(quesCategories);
				// console.log(quesCategories);
			});
		});
	}

	getQuesBasedOnSelection(selection) {
		var categories = selection.cat; //Array
		var catLength = categories.length + 1;
		var levels = selection.lev; //Array

		var questions: Array<string> = [];
		var finalQuestions: Array<string> = [];

		// console.log(selection);
		return new Promise((resolve, reject) => {
			var dbRef = firebase.database().ref('questions');
			for (let i = 0; i < categories.length; ++i) {
				dbRef.orderByChild('Category 1').equalTo(categories[i]).on('value', (data) => {
					var quesObjLength = Object.keys(data.val()).length;
					var qN = 1;
					for (var q in data.val()) {
						for (var j = 0; j < levels.length; ++j) {
							if (data.val()[q]['Nivå'] == levels[j]) {
								questions.push(data.val()[q]);
								// console.log(data.val()[i]);
							}							
						}
						console.log(i, categories.length)
						if (i+1 == categories.length) {
							resolve(questions);	
							// console.log('On firedata', questions);
						}
						qN++;										
					}
					
					// console.log('QUESTIONS', data.val());
				});				
			}	
		});
	}



}
