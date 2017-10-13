import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
<<<<<<< HEAD
=======
import { SpelaPage } from '../spela/spela';
import { ÖvaPage } from '../\u00F6va/\u00F6va';
>>>>>>> 3eca691b148a32973b1ba6a2c5e95e7b5e0fed38

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

<<<<<<< HEAD
=======

  goToSpela(){
    this.navCtrl.push(SpelaPage);
  }
  goToOva(){
    this.navCtrl.push(ÖvaPage)
  }
>>>>>>> 3eca691b148a32973b1ba6a2c5e95e7b5e0fed38
}
