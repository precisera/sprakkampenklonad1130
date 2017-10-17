import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SpelaPage } from '../spela/spela';
import { OvaPage } from '../ova/ova';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }


  goToSpela(){
    this.navCtrl.push(SpelaPage);
  }
  goToOva(){
    this.navCtrl.push(OvaPage)
  }

}
