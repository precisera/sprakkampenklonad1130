import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { QuestionsPage } from '../questions/questions';
import { ResultPage } from '../result/result';


import { GlobalsProvider } from '../../providers/globals/globals';
import { TimerFormatPipe } from '../../pipes/timer-format/timer-format';


import * as $ from 'jquery';


/**
 * Generated class for the QuestionresultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
	selector: 'page-questionresults',
	templateUrl: 'questionresults.html',
})
export class QuestionresultsPage {

	answerCorrect: boolean; 
	quesOptions: Array<string> = [];
	correctAns: Array<string> = [];
	ansDesc: any;
	timeTaken: any;

	flow: string;
	quesMarks: number = 0;
	thisQuesMarks: number = 0;

	constructor(public navCtrl: NavController, public navParams: NavParams, private globals: GlobalsProvider, public alertCtrl: AlertController) {
		this.answerCorrect = this.navParams.get('correctAnsGiven');
		this.quesOptions = this.navParams.get('options');
		this.correctAns = this.navParams.get('correctAns');
		this.ansDesc = this.navParams.get('ansDesc');
		this.timeTaken = this.navParams.get('timeTaken');
		this.thisQuesMarks = this.navParams.get('thisQuesMarks');

		this.quesMarks = this.globals.marks;

		this.flow = this.navParams.get('flow');

		this.diffCorrectOptions();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad QuestionresultsPage', this.timeTaken, 'Marks', this.globals.marks);
	}

	goToNextQues() {
		/*console.log(this.globals.quesNum);
		console.log(this.globals.questions);*/		
		console.log('FLOW', this.flow);

		if (this.flow == 'savedQuestions') {
			if (this.globals.savedQuestions.length == this.globals.savedQuesNum) {
				console.log('Equal', this.globals.savedQuestions.length, this.globals.savedQuesNum, this.flow);
				
				this.navCtrl.setRoot(ResultPage, {flow: this.flow});

				/*var alert = this.alertCtrl.create({
					message: 'You have attempted all Saved Questions.',
					buttons: [
						{
							text: 'Ok',
							role: 'cancel'
						}
					]
				});
				alert.present();*/
			} else {
				console.log('Not Equal', this.globals.savedQuestions.length, this.globals.savedQuesNum, this.flow);

				this.navCtrl.setRoot(QuestionsPage, {flow: this.flow});
			}
		} else if (this.flow == 'practiceQuestions') {
			if (this.globals.questions.length == this.globals.quesNum) {
				console.log('Equal', this.globals.savedQuestions.length, this.globals.savedQuesNum, this.flow);

				var alert = this.alertCtrl.create({
					message: 'You have attempted all Saved Questions.',
					buttons: [
						{
							text: 'Ok',
							role: 'cancel'
						}
					]
				});
				alert.present();
			} else {
				console.log('Not Equal', this.globals.savedQuestions.length, this.globals.savedQuesNum, this.flow);

				this.navCtrl.setRoot(QuestionsPage, {flow: this.flow});
			}
		}
		
	}

	diffCorrectOptions() {
		var showOptions = [];
		var matched = false;
		for (var i = 0; i < this.quesOptions.length; ++i) {
			for (var j = 0; j < this.correctAns.length; ++j) {
				if (this.quesOptions[i] == this.correctAns[j]) {
					showOptions.push({option: this.quesOptions[i], backColor: '#afdc9b'});
					// console.log(this.quesOptions[i], this.correctAns[j]);
					matched = true;
				}
			}
			if (!matched) {
				showOptions.push({option: this.quesOptions[i], backColor: '#db9b9b'});
			}
			matched = false;

		}

		if (this.quesOptions.length == showOptions.length) {
			this.quesOptions = showOptions;
			console.log(this.quesOptions);
		}
		
	}

	saveQuestion() {
		// var quesToSave = this.questions[this.quesNum]['qId'];
		// this.fireData.saveUserSelectedQuestion(quesToSave).then(() => {
		// 	this.presentToast('Question Saved');
		// });		
	}

	addUserProgressDetails() {
		var timeTaken = this.timeTaken;
		var marksGained = this.globals.marks;
	}

	/*checkFlow() {
		switch(this.flow) {
			case 'savedQuestions':
				this.totalQuesNum = this.globals.savedQuesNum;
				this.correctQues = this.globals.correctSavedQuestionsNum;
				break;
			case 'savedQuestions_timeup':
				break;
			case 'practiceQuestions':
				this.totalQuesNum = this.globals.savedQuesNum;
				this.correctQues = this.globals.correctSavedQuestionsNum;
				break;
			default:
				console.log('Match Not Found');
		}
	}*/
}
