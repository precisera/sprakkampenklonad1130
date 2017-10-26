import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import * as $ from 'jquery';
import * as _ from 'lodash';

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

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.questions = this.navParams.get('questions');

		

		// this.question = "Some dummy question";
		// this.description = "some dummy description";
		this.numOfQues = this.questions.length;

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
		this.quesOptions = this.questions[this.quesNum]['options'];
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
			// console.log('p', domEle.parentElement.parentElement);
			$('.answercard').css('background-color', 'red !important');
		} else if (clickedTag == 'ION-CARD-CONTENT') {
			// console.log('ion-card', domEle.parentElement);
			$(domEle.parentElement).css('border', '1px solid red !important');
		}

		if (this.userSelectedOptions == []) {
			this.userSelectedOptions.push(option);
		} else {
			var eleExists = this.userSelectedOptions.includes(option);
			console.log(eleExists);
			if (eleExists) {
				// Do Nothing
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

		if (this.correctOptions.length == correctAnsLength) {
			console.log(this.userSelectedOptions);
		} else {
			
		}
	}

 
}
