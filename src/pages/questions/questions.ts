import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { QuestionresultsPage } from '../questionresults/questionresults';
import { YourProgressPage } from '../your-progress/your-progress';


import * as $ from 'jquery';
import * as _ from 'lodash';

import { GlobalsProvider } from '../../providers/globals/globals';
import { FireDataProvider } from '../../providers/fire-data/fire-data';

import { Observable } from 'rxjs/Rx';

import { TimerFormatPipe } from '../../pipes/timer-format/timer-format';


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
	flow: string = '';

	tick: any;
	timer: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, private globals: GlobalsProvider, public fireData: FireDataProvider, public toastCtrl: ToastController, public alertCtrl: AlertController) {
		this.startTimer();
	}	

	ionViewWillEnter() {

		console.log('WillEnter QuestionsPage');
	}

	ionViewDidLoad() {
		this.getQuestions();
		console.log('ionViewDidLoad QuestionsPage');
		
	}

	showQues() {
		//contains single question object at a time
		console.log(this.questions);
		this.question = this.questions[this.quesNum]['Question'];
		this.description = this.questions[this.quesNum]['Answer'];
		this.quesLevel = this.questions[this.quesNum]['Nivå'];
		this.quesCat = this.questions[this.quesNum]['Category 1'];

		var shuffledOptions = _.shuffle(this.questions[this.quesNum]['options']);
		this.quesOptions = shuffledOptions;		

		this.correctOptions = this.questions[this.quesNum]['correctOptions'];

		this.dispQuesNum = this.quesNum + 1;

		console.log('dispQuesNum', this.dispQuesNum, 'ques length', this.questions.length);
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
		// Stop Timer
		this.stopTimer();
		var ans: any;
		var correctAnsLength: any = 0;;
		console.log('Selected Answers => ', this.userSelectedOptions)
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
			this.globals.savedQuesNum++;

			this.navCtrl.setRoot(QuestionresultsPage, {correctAnsGiven: true, options: this.quesOptions, correctAns: this.correctOptions, ansDesc: this.description, flow: this.flow});
		} else {
			this.globals.quesNum++;
			this.globals.savedQuesNum++;

			this.navCtrl.setRoot(QuestionresultsPage, {correctAnsGiven: false, options: this.quesOptions, correctAns: this.correctOptions, ansDesc: this.description, flow: this.flow});
		}		
	}

	saveQuestion() {
		var quesToSave = this.questions[this.quesNum]['qId'];
		this.fireData.saveUserSelectedQuestion(quesToSave).then(() => {
			this.presentToast('Question Saved');
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

	getQuestions() {
		console.log('Cons', this.navParams.get('flow'), this.globals.savedQuesNum);
		this.questions = [];
		if (this.navParams.get('from') == 'savedQuestions' || this.navParams.get('flow') == 'savedQuestions') {
			console.log('Cons1', this.navParams.get('flow'), this.globals.savedQuesNum);
			this.flow = 'savedQuestions';
			if (this.globals.savedQuesNum == 0) {
				this.quesNum = this.globals.savedQuesNum;
				this.questions = this.navParams.get('questions');
				this.globals.savedQuestions = this.navParams.get('questions');
			}else if (this.globals.savedQuesNum != 0) {
				this.quesNum = this.globals.savedQuesNum;
				this.questions = this.globals.savedQuestions;
			}			
			this.numOfQues = this.questions.length;
			console.log('SavedQUES => ', this.questions);

		} else if (this.navParams.get('flow') == 'savedQuestions_timeup') {
			this.flow = this.navParams.get('flow');
			console.log('Cons2', this.navParams.get('flow'), this.globals.savedQuesNum);
			console.log('!@!@!@!@!@', 'savedQuestions_timeup');
			if (this.globals.savedQuestions.length == this.globals.savedQuesNum) {
				console.log('End Reached');
				this.navCtrl.setRoot(YourProgressPage);
			} else {
				if (this.globals.savedQuesNum == 0) {
					this.quesNum = this.globals.savedQuesNum;
					this.questions = this.navParams.get('questions');
					this.globals.savedQuestions = this.navParams.get('questions');
				} else if (this.globals.savedQuesNum != 0) {
					this.quesNum = this.globals.savedQuesNum;
					this.questions = this.globals.savedQuestions;
				}

				/*console.log('savedQuestions_timeup   $%^$&*', this.questions);
				this.groupQuesOptions();
				this.showQues();*/
			}
			this.numOfQues = this.questions.length;

		} else if (this.navParams.get('flow') == 'practiceQuestions') {
			console.log('Cons3', this.navParams.get('flow'), this.globals.savedQuesNum);
			this.flow = 'practiceQuestions';
			if (this.globals.quesNum == 0) {
				console.log('this.globals.quesNum == 0');
				this.questions = this.navParams.get('questions');
				console.log(this.questions);
				this.globals.questions = this.navParams.get('questions');
				this.globals.quesNum++;
			}else if (this.globals.quesNum != 0) {
				console.log('this.globals.quesNum != 0');

				this.quesNum = this.globals.quesNum;
				this.questions = this.globals.questions;

				console.log(this.globals.questions);
				this.globals.quesNum++;
				
			}
			this.numOfQues = this.questions.length;
		}

		if (this.questions) {
			this.groupQuesOptions();
			this.showQues();

			console.log('QUES => ', this.questions);
		}
	}

	startTimer() {
		this.timer = Observable.timer(0, 1000)
		.map(value => 170 - value)
		.takeWhile(value => value >= 0)
		.subscribe((t) => {
			this.tick = t
			if (t == 0) {
				this.globals.savedQuesNum++;
				var timeUpAlert = this.alertCtrl.create({
					title: 'Sorry, Times Up!',
					buttons: [
						{
							text: 'OK',
							handler: () => {
								this.navCtrl.setRoot(this.navCtrl.getActive().component, {flow: this.flow});
							}

						}
					]
				});
				timeUpAlert.present();
			}
			// console.log(t);
		});
	}

	stopTimer() {
		this.timer.unsubscribe();
	}
}
