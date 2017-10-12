import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SpelaPage } from '../pages/spela/spela';
// import { OvaPage } from '../pages/ova/ova';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ÖvaPage } from '../pages/\u00F6va/\u00F6va';
import { YourProgressPage } from '../pages/your-progress/your-progress';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ÖvaPage,
    SpelaPage,
    YourProgressPage,
    
    
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
    ÖvaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
