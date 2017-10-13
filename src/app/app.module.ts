import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
<<<<<<< HEAD

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
=======
import { SpelaPage } from '../pages/spela/spela';
// import { OvaPage } from '../pages/ova/ova';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ÖvaPage } from '../pages/\u00F6va/\u00F6va';
import { YourProgressPage } from '../pages/your-progress/your-progress';
>>>>>>> 3eca691b148a32973b1ba6a2c5e95e7b5e0fed38

@NgModule({
  declarations: [
    MyApp,
    HomePage,
<<<<<<< HEAD
    ListPage
=======
    ListPage,
    ÖvaPage,
    SpelaPage,
    YourProgressPage,
    
    
>>>>>>> 3eca691b148a32973b1ba6a2c5e95e7b5e0fed38
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{mode: 'ios'}),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
<<<<<<< HEAD
    ListPage
=======
    ListPage,
    YourProgressPage,
    SpelaPage,
    ÖvaPage
>>>>>>> 3eca691b148a32973b1ba6a2c5e95e7b5e0fed38
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
