import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

import { FireDataProvider } from '../../providers/fire-data/fire-data';



/**
 * Generated class for the ÖvaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ova',
  templateUrl: 'ova.html',
})
export class OvaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public fireData: FireDataProvider) {

    this.fireData.getAllQuestions();
  }

  ionViewDidLoad() {
    console.log('!@!@!@!@!@!@');
    console.log('ionViewDidLoad ÖvaPage');
  }
  
  popBack(){
  this.navCtrl.pop();
  }

  goToPractice(){
    
  }
}
