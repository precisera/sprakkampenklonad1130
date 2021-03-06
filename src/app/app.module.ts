import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LevelPage } from '../pages/level/level';
import { ListPage } from '../pages/list/list';
import { QuestionsPage } from '../pages/questions/questions';
import { QuestionresultsPage } from '../pages/questionresults/questionresults';
import { ResultPage } from '../pages/result/result';

import { SpelaPage } from '../pages/spela/spela';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OvaPage } from '../pages/ova/ova';
import { YourProgressPage } from '../pages/your-progress/your-progress';
import { VeckokampenPage } from '../pages/veckokampen/veckokampen';
import { VersusPage } from '../pages/versus/versus';
import { FireDataProvider } from '../providers/fire-data/fire-data';
import { GlobalsProvider } from '../providers/globals/globals';

import { IonicStorageModule } from '@ionic/storage';

import { PipesModule } from '../pipes/pipes.module'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    OvaPage,
    SpelaPage,
    YourProgressPage,
    VeckokampenPage,
    VersusPage,
    LevelPage,
    QuestionsPage,
    QuestionresultsPage,
    ResultPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{mode: 'ios'}),
    IonicStorageModule.forRoot(),
    PipesModule
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
    VersusPage,
    LevelPage,
    QuestionsPage,
    QuestionresultsPage,
    ResultPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FireDataProvider,
    GlobalsProvider
  ]
})
export class AppModule {}
