import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { VeckokampenPage } from '../veckokampen/veckokampen';
import { VersusPage } from '../versus/versus';


@Component({
  selector: 'page-spela',
  templateUrl: 'spela.html',
})
export class SpelaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpelaPage');
  }
  popBack(){
  	this.navCtrl.pop();
  }

    goToVeckokampen(){
      this.navCtrl.push(VeckokampenPage);
    }

    goToVersus(){
      this.navCtrl.push(VersusPage)
    }
}
