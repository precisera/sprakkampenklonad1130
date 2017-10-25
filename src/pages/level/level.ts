import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { QuestionsPage } from '../questions/questions';

/**
 * Generated class for the LevelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-level',
  templateUrl: 'level.html',
})
export class LevelPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LevelPage');
  }

  popBack(){
  this.navCtrl.pop();
  }

  goToPractice(){
    this.navCtrl.setRoot(QuestionsPage);
  }

}
