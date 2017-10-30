import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LevelPage } from '../level/level';
import { QuestionsPage } from '../questions/questions';

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

	Synonymer: boolean = false;
	Metaforer: boolean = false;
	Grammatik: boolean = false;
	Dialekt: boolean = false;
	Stavning: boolean = false;

	savedQuestionsLength;
	savedQuestionsKeys: any = [];

	constructor(public navCtrl: NavController, public navParams: NavParams, public fireData: FireDataProvider, public loadingCtrl :LoadingController) {
		
	}

	ionViewWillEnter() {
		this.getSavedQuestionsKeys();
	}

	ionViewDidLoad() {
		console.log('!@!@!@!@!@!@');
		console.log('ionViewDidLoad ÖvaPage');
	}

	checkNg() {
		console.log(this.Synonymer);
	}
	
	popBack(){
		this.navCtrl.pop();
	}

	goToPractice(){
		var catSelectedByUser = [];
		if (this.Synonymer) {
			catSelectedByUser.push('Ordförståelse');
		}
		if (this.Metaforer) {
			catSelectedByUser.push('Synonymer & motsatser');
		}
		if (this.Grammatik) {
			catSelectedByUser.push('Släkt & slang');
		}
		if (this.Dialekt) {
			catSelectedByUser.push('Ordspråk & uttryck');
		}
		if (this.Stavning) {
			catSelectedByUser.push('Stavning & grammatik');
		}
		this.navCtrl.push(LevelPage, {cat: catSelectedByUser});
	}

	getSavedQuestionsKeys() {
		var loader = this.loadingCtrl.create({
			spinner: 'dots',
			content: 'Loading'
		});
		loader.present();
		this.fireData.getUserSelectedQuestionKeys().then((data) => {
			if (!data) {
				this.savedQuestionsLength = 0;
			} else {
				for (var i in data) {
					this.savedQuestionsKeys.push(data[i]);
				}
				this.savedQuestionsLength = this.savedQuestionsKeys.length;
			}
			loader.dismiss();
			
		});
	}

	getSavedQuestions() {
		this.fireData.getUserSelectedQuestion(this.savedQuestionsKeys).then((data) => {
			console.log('jkahsdgfsuyg', data);
			this.navCtrl.setRoot(QuestionsPage, {from: 'savedQuestions', questions: data});
		});
	}
}
