import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.answerCorrect = false;
  	this.quesOptions = ['En afton','Flera aftnar']
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionresultsPage');
  }

}
