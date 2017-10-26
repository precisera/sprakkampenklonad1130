import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { QuestionsPage } from '../questions/questions';

import { GlobalsProvider } from '../../providers/globals/globals';


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
	quesOptions: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private globals: GlobalsProvider) {
  	this.answerCorrect = this.navParams.get('correctAnsGiven');
  	this.quesOptions = ['En afton','Flera aftnar']
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionresultsPage');
  }

  goToNextQues() {
    /*console.log(this.globals.quesNum);
    console.log(this.globals.questions);*/
    this.navCtrl.push(QuestionsPage);
  }

}
