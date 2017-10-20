import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SpelaPage } from '../pages/spela/spela';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OvaPage } from '../pages/ova/ova';
import { YourProgressPage } from '../pages/your-progress/your-progress';
import { VeckokampenPage } from '../pages/veckokampen/veckokampen';
import { VersusPage } from '../pages/versus/versus';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    OvaPage,
    SpelaPage,
    YourProgressPage,
    VeckokampenPage,
    VersusPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{mode: 'ios'}),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    YourProgressPage,
    SpelaPage,
    OvaPage,
    VeckokampenPage,
    VersusPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}