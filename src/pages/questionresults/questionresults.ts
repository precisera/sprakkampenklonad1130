import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { QuestionsPage } from '../questions/questions';

import { GlobalsProvider } from '../../providers/globals/globals';

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
// <<<<<<< HEAD
// 	quesOptions: any;

//   constructor(public navCtrl: NavController, public navParams: NavParams, private globals: GlobalsProvider) {
//   	this.answerCorrect = this.navParams.get('correctAnsGiven');
//   	this.quesOptions = ['En afton','Flera aftnar']
//   }

//   ionViewDidLoad() {
//     console.log('ionViewDidLoad QuestionresultsPage');
//   }

//   goToNextQues() {
//     /*console.log(this.globals.quesNum);
//     console.log(this.globals.questions);*/
//     this.navCtrl.setRoot(QuestionsPage);
//   }
// =======
	quesOptions: Array<string> = [];
	correctAns: Array<string> = [];
	ansDesc: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, private globals: GlobalsProvider) {
		this.answerCorrect = this.navParams.get('correctAnsGiven');
		this.quesOptions = this.navParams.get('options');
		this.correctAns = this.navParams.get('correctAns');
		this.ansDesc = this.navParams.get('ansDesc');

		this.diffCorrectOptions();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad QuestionresultsPage');
	}

	goToNextQues() {
		/*console.log(this.globals.quesNum);
		console.log(this.globals.questions);*/
		this.navCtrl.setRoot(QuestionsPage);
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

}
