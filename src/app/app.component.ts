import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SpelaPage } from '../pages/spela/spela';
import { OvaPage } from '../pages/ova/ova';
import { YourProgressPage } from '../pages/your-progress/your-progress';

import { FireDataProvider } from '../providers/fire-data/fire-data';
import { GlobalsProvider } from '../providers/globals/globals';

import { Storage } from '@ionic/storage';



import * as firebase from 'firebase';




@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage: any = HomePage;

	pages: Array<{title: string, component: any}>;

	constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private fireData: FireDataProvider, private globals: GlobalsProvider, private storage: Storage) {
		this.initializeApp();
		console.log('GLOBALS', this.globals);

		// used for an example of ngFor and navigation
		this.pages = [
			{ title: 'Home', component: HomePage },
			{ title: 'Spela', component: SpelaPage },
			{ title: 'Öva', component: OvaPage },
			{ title: 'Your Progress', component: YourProgressPage },
			{ title: 'Feedback', component: ListPage }

		];

	}

	initializeApp() {
		this.initializeFirebase();
		this.storage.get('anonymousUid').then((data) => {
			if (!data) {
				this.doAnonymousLogin();
			}
			console.log(data);
		});	

		this.platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}

	openPage(page) {
		// Reset the content nav to have just this page
		// we wouldn't want the back button to show in this scenario
		this.nav.setRoot(page.component);
	}

	initializeFirebase() {
		// Initialize Firebase
		var config = {
			apiKey: "AIzaSyBquCtFdmDW7487fk2rGHS41yixqYpvF1I",
			authDomain: "sprakkampen-4a494.firebaseapp.com",
			databaseURL: "https://sprakkampen-4a494.firebaseio.com",
			projectId: "sprakkampen-4a494",
			storageBucket: "sprakkampen-4a494.appspot.com",
			messagingSenderId: "650225229649"
		};
		firebase.initializeApp(config);
	}

	doAnonymousLogin() {
		firebase.auth().signInAnonymously().then((data) => {
			firebase.auth().onAuthStateChanged((user) => {
				if (user) {
					// User is signed in.
					var isAnonymous = user.isAnonymous;
					var uid = user.uid;
					if (!this.globals.anonymousLoggedIn) {						
						this.fireData.registerAnonymousUserDB(uid).then(() => {
							this.globals.anonymousLoggedIn = true;
							this.globals.anonymousUid = user.uid;
							this.storage.set('anonymousUid', user.uid);
						});												
					}
				} else {
					console.log('User Signed Out');
				}
				// ...
			});
		}).catch((error) => {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log('Anonymous Error => ', errorCode, errorMessage);
		});
	}
}
