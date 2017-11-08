import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import * as firebase from 'firebase';
import { GlobalsProvider } from '../../providers/globals/globals';

import { Storage } from '@ionic/storage';

import * as moment from 'moment';


/*
  Generated class for the FireDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FireDataProvider {

	constructor(public http: Http, private globals: GlobalsProvider, private storage: Storage) {
		console.log('Hello FireDataProvider Provider');
	}

	registerAnonymousUserDB(uid) {
		return new Promise((resolve) => {
			var dbRef = firebase.database().ref('users').child(uid);
			dbRef.set({
				anonymousId: uid
			}, () => {
				resolve();
			});
		});		
	}

	getAllQuestions() {
		var questions: Array<string> = [];
		return new Promise((resolve, reject) => {
			var dbRef = firebase.database().ref('questions');
			dbRef.on('value', (data) => {
				// console.log('QUESTIONS', data.val());
				for (var q in data.val()) {
					if (data.val()[q]['Question']) {
						questions.push(data.val()[q]);
					}					
				}
				resolve(questions);

			})
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

	saveUserSelectedQuestion(qid) {
		return new Promise((resolve) => {
			var dbRef;
			console.log('Globals UID', this.globals.anonymousUid, qid);
			if (this.globals.anonymousUid) {
				dbRef = firebase.database().ref('/users/' + this.globals.anonymousUid).child('savedQuestions/' + qid);
				var newSavedQues = dbRef/*.push()*/;

				newSavedQues.set({
					qId: qid
				}, () => {
					resolve();
				});
			} else {
				this.storage.get('anonymousUid').then((data) => {
					dbRef = firebase.database().ref('/users/' + data).child('savedQuestions/' + qid);
					var newSavedQues = dbRef/*.push()*/;

					newSavedQues.set({
						qId: qid
					}, () => {
						resolve();
					});
				});
			}
		});
	}

	getUserSelectedQuestionKeys() {
		return new Promise((resolve, reject) => {
			var dbRef;
			if (this.globals.anonymousUid) {
				dbRef = firebase.database().ref('/users/' + this.globals.anonymousUid).child('savedQuestions');
				dbRef.on('value', (data: any) =>{
					resolve(data.val());
				});
			} else {
				this.storage.get('anonymousUid').then((data) => {
					dbRef = firebase.database().ref('/users/' + data).child('savedQuestions');
					dbRef.on('value', (data: any) =>{
						resolve(data.val());
					});
				});
			}
		});		
	}

	getUserSelectedQuestion(keys) {
		var savedQuestions = [];
		console.log(keys);
		return new Promise((resolve) =>{
			for (var i = 0; i < keys.length; ++i) {
				console.log(keys[i])
				var dbRef = firebase.database().ref('questions').child(keys[i].qId);
				dbRef.on('value', (data) => {
					savedQuestions.push(data.val());
				});
			}

			resolve(savedQuestions);
		})
	}

	saveResult(stats) {
		var currTime = moment().format();
		return new Promise((resolve, reject) => {			
			this.storage.get('anonymousUid').then((data) => {
				var dbRef = firebase.database().ref('users').child(data);
				var result = dbRef.push();

				result.set({
					prevPracticeId: result.key,
					practicedAt: currTime,
					stats: stats
				}, () => {
					resolve();
				});
			});
		});
	}
}
