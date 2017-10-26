import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { QuestionresultsPage } from '../questionresults/questionresults';

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

	numOfQues: any = 0; 

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

		this.dispQuesNum = this.quesNum + 1;

		// this.options = this.questions[]
	}

	groupQuesOptions() {
		for (var i = 0; i < this.questions.length; ++i) {
			var ques: any = this.questions[i];
			var options = [];
			for (var j = 0; j < 10; ++j) {
				if (ques['Correct ' + j]) {
					options.push(ques['Correct ' + j]);					
				}

				if (ques['Wrong ' + j]) {
					options.push(ques['Wrong ' + j]);					
				}
			}

			ques.options = options;
		}
	}

	submitAndPushNextQues() {

		this.navCtrl.push(QuestionresultsPage);

	}

 
}
