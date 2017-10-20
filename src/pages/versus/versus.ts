import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-versus',
  templateUrl: 'versus.html',
})
export class VersusPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VersusPage');
  }


  popBack(){
    this.navCtrl.pop()
  }
}
