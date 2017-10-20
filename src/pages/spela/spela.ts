import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { VeckokampenPage } from '../veckokampen/veckokampen';
import { VersusPage } from '../versus/versus';


@IonicPage()
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
    this.navCtrl.push(HomePage)
    }

    goToVeckokampen(){
      this.navCtrl.push(VeckokampenPage);
    }

    goToVersus(){
      this.navCtrl.push(VersusPage)
    }
}
