import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { QuestionsPage } from '../questions/questions';

import { FireDataProvider } from '../../providers/fire-data/fire-data';



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
	Level1: boolean = false;
	Level2: boolean = false;
	Level3: boolean = false;
	selectedCategories = [];
	selectedLevels = [];
	userSelection: any = {};
	constructor(public navCtrl: NavController, public navParams: NavParams, public fireData: FireDataProvider, public loadingCtrl: LoadingController) {
		this.selectedCategories = this.navParams.get('cat');
		console.log(this.selectedCategories);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LevelPage');
	}

	popBack(){
		this.navCtrl.pop();
	}

	goToPractice(){
		if (this.Level1) {
			this.selectedLevels.push('1');
		}

		if (this.Level2) {
			this.selectedLevels.push('2');
		}

		if (this.Level3) {
			this.selectedLevels.push('3');
		}

		this.userSelection.cat = this.selectedCategories;
		this.userSelection.lev = this.selectedLevels;

		var loading =  this.loadingCtrl.create({
			spinner: 'dots',
			content: 'Getting Questions ...'
		});
		loading.present();
		this.fireData.getQuesBasedOnSelection(this.userSelection).then((data) => {
			loading.dismiss();
			this.navCtrl.setRoot(QuestionsPage, {questions: data, flow: 'practiceQuestions'});
		});
		// console.log(this.userSelection);
		
	}

}
