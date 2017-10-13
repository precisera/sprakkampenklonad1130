import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
<<<<<<< HEAD
=======
import { SpelaPage } from '../pages/spela/spela';
import { ÖvaPage } from '../pages/\u00F6va/\u00F6va';
import { YourProgressPage } from '../pages/your-progress/your-progress';
>>>>>>> 3eca691b148a32973b1ba6a2c5e95e7b5e0fed38

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
<<<<<<< HEAD
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
=======
      { title: 'Spela', component: SpelaPage },
      { title: 'Öva', component: ÖvaPage },
      { title: 'Your Progress', component: YourProgressPage },
      
      { title: 'Home', component: HomePage },
      { title: 'Feedback', component: ListPage }
>>>>>>> 3eca691b148a32973b1ba6a2c5e95e7b5e0fed38
    ];

  }

  initializeApp() {
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
}
