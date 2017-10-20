import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the VeckokampenPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-veckokampen',
  templateUrl: 'veckokampen.html',
})
export class VeckokampenPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VeckokampenPage');
  }
  
  popBack(){
    this.navCtrl.pop()
    }

    saveButton(){
      
    }
}
