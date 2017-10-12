import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YourProgressPage } from './your-progress';

@NgModule({
  declarations: [
    YourProgressPage,
  ],
  imports: [
    IonicPageModule.forChild(YourProgressPage),
  ],
})
export class YourProgressPageModule {}
