import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { FireDataProvider } from '../../providers/fire-data/fire-data';
import { HomePage } from '../home/home';

import { QuestionsPage } from '../questions/questions';

import * as moment from 'moment';

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

	constructor(public navCtrl: NavController, public navParams: NavParams, public fireData: FireDataProvider, public loadingCtrl: LoadingController) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad VeckokampenPage');
	}
	
	popBack(){
		this.navCtrl.pop()
		}

		goToQuesPage() {
			var loader = this.loadingCtrl.create({
				spinner: 'dots',
				content: 'Loading'
			});
			loader.present();
			// console.log('Run GoToQuesPage');
			// Get Questions From fireData
			var type = 'hasWeeks';
			var questionsToFwd: Array<string> = [];
			this.fireData.getAllQuestions(type).then((questions: any) =>{
				// console.log(questions);
				var currWeekYear = this.getCurrentWeekYear();
				for (var i = 0; i < questions.length; ++i) {
					// console.log(i, questions.length-1);
					
					if (currWeekYear == questions[i]['Veckokampen']) {
						questionsToFwd.push(questions[i]);
						// console.log(currWeekYear, typeof(currWeekYear), questions[i]['Veckokampen'], typeof(questions[i]['Veckokampen']));
						// console.log(i, questions.length-1);
						
					}					
				}
				
				if (questionsToFwd) {
					loader.dismiss();
					// console.log(currWeekYear, questions[i]['Veckokampen']);
					this.navCtrl.setRoot(QuestionsPage, {questions: questionsToFwd, flow: 'veckokampen'});	
				} else {
					loader.dismiss();
					alert('No Question Found Matching the Week');
				}
			}).catch((err) => {
				console.log(err);
			});
		}

		getCurrentWeekYear() {
			var currDate = moment().format();
			var currWeek = String(moment(currDate).week());
			var currYear = String(moment(currDate).year());
			// console.log(currDate, currWeek+currYear);
			return currWeek+currYear;
		}
}
