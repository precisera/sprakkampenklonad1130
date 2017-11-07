import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GlobalsProvider } from '../../providers/globals/globals';
import { TimerFormatPipe } from '../../pipes/timer-format/timer-format';



/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {
	flow: any;
	totalQuesNum: any;
	numOfCorrectQues: any;
	numOfWrongQues: any;
	totalTimeTaken: any;
	totalPoints: any;
	maxMarksPossible: any;
	constructor(public navCtrl: NavController, public navParams: NavParams, private globals: GlobalsProvider) {
		this.flow = this.navParams.get('flow');
		this.checkFlow();
		
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ResultPage');
	}

	checkFlow() {
		switch(this.flow) {
			case 'savedQuestions':
				this.numOfCorrectQues = this.globals.numOfCorrectSavedQuestions;
				this.numOfWrongQues = this.globals.numOfWrongQues;
				this.totalTimeTaken = this.globals.totalTimeTakenSavedQues;
				this.totalPoints = this.globals.marks;
				this.maxMarksPossible = this.globals.maxPossibleMarksSavedToGet;
			break;
			/*case 'savedQuestions_timeup':
				break;*/
			case 'practiceQuestions':
				this.numOfCorrectQues = this.globals.numOfCorrectQues;	
				this.numOfWrongQues = this.globals.numOfWrongQues;
				this.totalTimeTaken = this.globals.totalTimeTaken;
				this.totalPoints = this.globals.marks;
				this.maxMarksPossible = this.globals.maxPossibleMarksToGet;
			break;
			default:
				console.log('Match Not Found');
		}
	}

}
