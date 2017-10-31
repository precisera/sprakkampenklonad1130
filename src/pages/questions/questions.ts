import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { QuestionresultsPage } from '../questionresults/questionresults';

import * as $ from 'jquery';
import * as _ from 'lodash';

import { GlobalsProvider } from '../../providers/globals/globals';
import { FireDataProvider } from '../../providers/fire-data/fire-data';



/**
 * Generated class for the QuestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
	selector: 'page-questions',
	templateUrl: 'questions.html',
})
export class QuestionsPage {
	questions: Array<string> = [];
	question: any;
	description: any;
	options: Array<string> = [];

	quesNum: number = 0;
	dispQuesNum: number = 0;
	quesLevel: any = '';
	quesCat: string = '';
	quesOptions: Array<string> = [];
	correctOptions: Array<string> = [];

	numOfQues: any = 0;
	userSelectedOptions: any = [];

	constructor(public navCtrl: NavController, public navParams: NavParams, private globals: GlobalsProvider, public fireData: FireDataProvider, public toastCtrl: ToastController) {		

		if (this.globals.quesNum == 0) {
			this.questions = this.navParams.get('questions');
			this.globals.questions = this.navParams.get('questions');
		}else if (this.globals.quesNum != 0) {
			this.quesNum = this.globals.quesNum;
			this.questions = this.globals.questions;

			console.log(this.globals.questions);
		}
		this.numOfQues = this.questions.length;

		if (this.navParams.get('from') == 'savedQuestions') {
			this.questions = [];
			this.quesNum = 0;
			this.questions = this.navParams.get('questions');

			console.log('SavedQUES => ', this.questions);
		}

		this.groupQuesOptions();
		this.showQues();

		console.log('QUES => ', this.questions);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad QuestionsPage');
	}

	showQues() {
		//contains single question object at a time 
		this.question = this.questions[this.quesNum]['Question'];
		this.description = this.questions[this.quesNum]['Answer'];
		this.quesLevel = this.questions[this.quesNum]['Nivå'];
		this.quesCat = this.questions[this.quesNum]['Category 1'];

		var shuffledOptions = _.shuffle(this.questions[this.quesNum]['options']);
		this.quesOptions = shuffledOptions;		

		this.correctOptions = this.questions[this.quesNum]['correctOptions'];

		this.dispQuesNum = this.quesNum + 1;

		// this.options = this.questions[]
	}

	groupQuesOptions() {
		for (var i = 0; i < this.questions.length; ++i) {
			var ques: any = this.questions[i];
			var options = [];
			var correctAns = [];
			for (var j = 0; j < 10; ++j) {
				if (ques['Correct ' + j]) {
					options.push(ques['Correct ' + j]);
					correctAns.push(ques['Correct ' + j]);
				}

				if (ques['Wrong ' + j]) {
					options.push(ques['Wrong ' + j]);					
				}
			}

			ques.options = options;
			ques.correctOptions = correctAns;
		}
	}

	addAnsByUser(event, option) {
		var domEle = event.target;
		var clickedTag = event.target.tagName;

		if (clickedTag == 'P') {
			console.log('p', domEle.parentElement.parentElement);
			$(domEle.parentElement.parentElement).addClass('card-background-color');
		} else if (clickedTag == 'ION-CARD-CONTENT') {
			console.log('ion-card', domEle.parentElement);
			$(domEle.parentElement).addClass('card-background-color');
		}

		if (this.userSelectedOptions == []) {
			this.userSelectedOptions.push(option);
		} else {
			var eleExists = this.userSelectedOptions.includes(option);
			console.log(eleExists);
			if (eleExists) {
				//If user already selected an option, and clicks the same, then uncheck the same option
				console.log(this.userSelectedOptions);
				_.remove(this.userSelectedOptions, (o) => {
					return o == option;
				});

				if (clickedTag == 'P') {
					console.log('p', domEle.parentElement.parentElement);
					$(domEle.parentElement.parentElement).removeClass('card-background-color');
				} else if (clickedTag == 'ION-CARD-CONTENT') {
					console.log('ion-card', domEle.parentElement);
					$(domEle.parentElement).removeClass('card-background-color');
				}
				console.log(this.userSelectedOptions);

			} else {
				this.userSelectedOptions.push(option);
			}
		}
	}

	submitCheckAns() {
		var ans: any;
		var correctAnsLength: any = 0;;
		for (var i = 0; i < this.correctOptions.length; ++i) {
			ans = this.correctOptions[i];
			var checkAns = this.userSelectedOptions.includes(ans);
			if (checkAns) {
				correctAnsLength++;
			}
		}

		console.log('!@!', this.correctOptions.length, correctAnsLength, this.userSelectedOptions.length);
		if (this.correctOptions.length == correctAnsLength && correctAnsLength == this.userSelectedOptions.length) {
			console.log(this.userSelectedOptions);
			this.globals.quesNum++;
			this.navCtrl.setRoot(QuestionresultsPage, {correctAnsGiven: true, options: this.quesOptions, correctAns: this.correctOptions, ansDesc: this.description});
		} else {
			this.globals.quesNum++;
			this.navCtrl.setRoot(QuestionresultsPage, {correctAnsGiven: false, options: this.quesOptions, correctAns: this.correctOptions, ansDesc: this.description});
		}		
	}

	saveQuestion() {
		var quesToSave = this.questions[this.quesNum]['qId'];
		this.fireData.saveUserSelectedQuestion(quesToSave).then(() => {
			this.presentToast('Question Saved.');
		});		
	}

	presentToast(msg) {
		const toast = this.toastCtrl.create({
		message: msg,
		duration: 1000,
		position: 'bottom'
		});

		toast.onDidDismiss(() => {
		console.log('Dismissed toast');
		});

		toast.present();
	} 
}
