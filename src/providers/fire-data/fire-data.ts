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
		var levels = selection.lev; //Array

		var questions: Array<string> = [];

		// console.log(selection);
		return new Promise((resolve, reject) => {
			var dbRef = firebase.database().ref('questions');
			dbRef.orderByChild('Category 1').equalTo(categories[0]).on('value', (data) => {
				for (var i in data.val()) {
					questions.push(data.val()[i]);
				}
				resolve(questions);
				// console.log('QUESTIONS', data.val());
			})
		});
	}



}
