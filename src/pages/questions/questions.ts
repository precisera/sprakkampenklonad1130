import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  question: any;
  description: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.question = "Some dummy question";
    this.description = "some dummy description";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionsPage');
  }

 
}
