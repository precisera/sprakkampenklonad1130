import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LevelPage } from '../level/level';
import { QuestionsPage } from '../questions/questions';

import { FireDataProvider } from '../../providers/fire-data/fire-data';
import { GlobalsProvider } from '../../providers/globals/globals';

import * as $ from 'jquery';

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
	SelectAll: boolean = false;

	getAllQuestions: boolean = false;
	savedQuestionsLength;
	savedQuestionsKeys: any = [];

	anyOptionSelected: boolean = false;

	constructor(public navCtrl: NavController, public navParams: NavParams, public fireData: FireDataProvider, public loadingCtrl :LoadingController, private globals: GlobalsProvider) {
		
	}

	ionViewWillEnter() {
		this.getSavedQuestionsKeys();
		this.reInitialiseGlobalTrackingVariables();
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

		if (this.getAllQuestions) {
			catSelectedByUser = [];
			catSelectedByUser.push('getAllQuestionsCategories');
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
				this.globals.savedQuestionsKeys = this.savedQuestionsKeys;
			}
			loader.dismiss();
			
		});
	}

	getSavedQuestions() {
		$('#saved-ques-link').css('pointer-events', 'none');
		this.fireData.getUserSelectedQuestion(this.savedQuestionsKeys).then((data: any) => {
			var savedQuestions: Array<object> = data;
			setTimeout(() => {
			if (data.length > 0) {				
					this.navCtrl.setRoot(QuestionsPage, {from: 'savedQuestions', questions: savedQuestions, flow: 'savedQuestions'});				
			}
			}, 1000);
		});
	}

	reInitialiseGlobalTrackingVariables() {
		this.globals.quesNum = 0;
		this.globals.savedQuesNum = 0;
		this.globals.marks = 0;
	}

	selectAllOptions(event) {
		if (this.SelectAll) {
			this.Synonymer = true;
			this.Metaforer = true;
			this.Grammatik = true;
			this.Dialekt = true;
			this.Stavning = true;
			this.SelectAll = true;

			this.getAllQuestions = true;
			$('#check1, #check2, #check3, #check4, #check5').css('pointer-events', 'none');
		} else {
			this.Synonymer = false;
			this.Metaforer = false;
			this.Grammatik = false;
			this.Dialekt = false;
			this.Stavning = false;
			this.SelectAll = false;

			this.getAllQuestions = false;
			$('#check1, #check2, #check3, #check4, #check5').css('pointer-events', 'auto');
		}
		// console.log(this.SelectAll, event.value);
	}

	checkIfAnyOptionSelected(event) {
		var optionChecked = event.value;
		// console.log(optionChecked);
		if (optionChecked) {
			if (this.Synonymer || this.Metaforer || this.Grammatik || this.Dialekt || this.Stavning || this.SelectAll) {
				this.anyOptionSelected = true;
				console.log('Option is selecetd');
			}			
		} else {
			if (!this.Synonymer && !this.Metaforer && !this.Grammatik && !this.Dialekt && !this.Stavning && !this.SelectAll) {
				this.anyOptionSelected = false;
				console.log('Option is selecetd');
			}	
		}
		
	}
}
